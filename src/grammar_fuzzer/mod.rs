use std::collections::BTreeSet;

use crate::grammar::*;
use lazy_static::lazy_static;
use rand::prelude::*;
use regex::Regex;
use rayon::prelude::*;
use self::options::exp_string;

mod test;

#[derive(Clone)]
pub struct DerivationTree {
    symbol: String,
    children: std::option::Option<Vec<Box<DerivationTree>>>,
}
lazy_static! {
    static ref DERIVATION_TREE: DerivationTree = DerivationTree {
        symbol: "<start>".to_string(),
        children: Some(vec![Box::from(DerivationTree {
            symbol: "<expr>".to_string(),
            children: Some(vec![
                Box::new(DerivationTree {
                    symbol: "<expr>".to_string(),
                    children: None
                }),
                Box::new(DerivationTree {
                    symbol: " + ".to_string(),
                    children: Some(Vec::new())
                }),
                Box::new(DerivationTree {
                    symbol: "<term>".to_string(),
                    children: None
                })
            ])
        })])
    };
}

pub struct GrammarsFuzzer<'l_use> {
    grammar: Grammar<'l_use>,
    start_symbol: &'l_use str, //= START_SYMBOL
    min_nonterminals: usize,   //= 0,
    max_nonterminals: usize,   //= 10,
    disp: bool,                // = False,
    log: Union<bool, usize>,
}

impl<'l_use> GrammarsFuzzer<'l_use> {
    pub fn new(
        grammar: &Grammar<'l_use>,
        start_symbol: &'l_use str, //= START_SYMBOL
        min_nonterminals: usize,   //= 0,
        max_nonterminals: usize,   //= 10,
        disp: bool,                // = False,
        log: Union<bool, usize>,
    ) -> Self {
        //= False
        Self {
            grammar: grammar.clone(),
            start_symbol: start_symbol,
            min_nonterminals: min_nonterminals,
            max_nonterminals: max_nonterminals,
            disp: disp,
            log: log,
        }
    }
    pub fn check_grammar(&self) {
        assert!(self.grammar.contains_key(self.start_symbol));
        assert!(is_valid_grammar(
            &self.grammar,
            self.start_symbol,
            self.supported_opts()
        ));
    }

    pub fn supported_opts(&self) -> BTreeSet<String> {
        return BTreeSet::new();
    }

    pub fn init_tree(&self) -> DerivationTree {
        DerivationTree {
            symbol: self.start_symbol.to_string(),
            children: None,
        }
    }

    pub fn choose_node_expansion(
        &self,
        rd: &mut ThreadRng,
        node: &DerivationTree,
        children_alternatives: &Vec<Vec<DerivationTree>>,
    ) -> usize {
        return rd.gen_range(0..children_alternatives.len());
    }

    pub fn expansion_to_children(&self, expansion: &Expansion<'l_use>) -> Vec<DerivationTree> {
        return expansion_to_children(expansion);
    }

    pub fn expand_node(&self, rd: &mut ThreadRng, node: &DerivationTree) -> DerivationTree {
        return self.expand_node_randomly(rd, node);
    }

    fn process_chosen_children(
        &self,
        chosen_children: &Vec<DerivationTree>,
        expansion: &Expansion,
    ) -> Vec<Box<DerivationTree>> {
        return chosen_children
            .par_iter()
            .map(|subtree| Box::new(subtree.clone()))
            .collect();
    }
    pub fn expand_node_randomly(
        &self,
        rd: &mut ThreadRng,
        node: &DerivationTree,
    ) -> DerivationTree {
        let (symbol, children) = (node.symbol.clone(), node.children.clone());
        assert!(children.is_none());

        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("Expanding {} randomly", all_terminals(node));
                }
            }
            Union::OnlyB(_) => {}
        }

        let expansions = &self.grammar[&symbol];
        let children_alternatives: Vec<Vec<DerivationTree>> = expansions
            .iter()
            .map(|exp| self.expansion_to_children(exp))
            .collect();

        let index = self.choose_node_expansion(rd, node, &children_alternatives);
        let chosen_children = children_alternatives[index].clone();

        let chosen_children = self.process_chosen_children(&chosen_children, &expansions[index]);

        return DerivationTree {
            symbol: symbol,
            children: Some(chosen_children),
        };
    }
}

fn expansion_to_children<'l_use>(expansion: &Expansion<'l_use>) -> Vec<DerivationTree> {
    let expansion = exp_string(expansion);

    if expansion == "" {
        return vec![DerivationTree {
            symbol: "".to_string(),
            children: Some(Vec::new()),
        }];
    }

    let strings: Vec<&str> = RE_NONTERMINAL.split(&expansion).collect();
    let non_empty_strings: Vec<String> = strings
        .par_iter()
        .filter(|s| s.len() > 0)
        .map(|s| s.to_string())
        .collect();
    let result = non_empty_strings
        .par_iter()
        .map(|s| {
            if is_nonterminal(s) {
                DerivationTree {
                    symbol: s.clone(),
                    children: None,
                }
            } else {
                DerivationTree {
                    symbol: s.clone(),
                    children: Some(Vec::new()),
                }
            }
        })
        .collect();

    return result;
}

pub fn tree_to_string(tree: &DerivationTree) -> String {
    let (symbol, children) = (tree.symbol.clone(), tree.children.clone());

    if children.is_some() {
        let children = children.unwrap();
        let nodes: Vec<String> = children
            .par_iter()
            .map(|nonterm_node| tree_to_string(&nonterm_node))
            .collect();
        return nodes.join("");
    } else {
        if is_nonterminal(&symbol) {
            return "".to_string();
        } else {
            return symbol;
        }
    }
}

pub fn all_terminals(tree: &DerivationTree) -> String {
    let (symbol, children) = (tree.symbol.clone(), tree.children.clone());
    if children.is_none() {
        return symbol.clone();
    }

    let children = children.unwrap();
    if children.len() == 0 {
        return symbol.clone();
    }
    let terminals: Vec<String> = children
        .par_iter()
        .map(|nonterm_node| all_terminals(&nonterm_node))
        .collect();
    return terminals.join("");
}

pub fn dot_escape(s: &String, mut show_ascii: std::option::Option<bool>) -> String {
    let mut s = s.clone();
    let mut escaped_s = String::with_capacity(32);
    if show_ascii.is_none() {
        show_ascii = Some(s.len() == 1);
    }
    let should_show_ascii = show_ascii.unwrap();

    if should_show_ascii && s == "\n" {
        return String::from("\\\\n (10)");
    }

    s = s.replace("\n", "\\n");
    for c in s.chars() {
        if c == '\\' || c == ',' || c == '<' || c == '>' || c == '\"' {
            escaped_s = escaped_s + "\\";
            escaped_s.push(c);
        } else if c.is_ascii() && 31 < c as u8 {
            escaped_s.push(c);
        } else {
            escaped_s = escaped_s + "\\\\x" + format!("{:02x}", c as u8).as_str();
        }

        if should_show_ascii {
            escaped_s = escaped_s + format!(" ({})", c as u8).as_str();
        }
    }

    return escaped_s;
}
