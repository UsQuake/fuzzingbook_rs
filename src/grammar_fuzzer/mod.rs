use std::{collections::{hash_map::DefaultHasher, BTreeSet, HashSet}, hash::{Hash, Hasher}, time::Instant};
use self::options::exp_string;
use crate::grammar::*;
use lazy_static::lazy_static;
use rustc_hash::FxHasher;
mod test;

#[derive(Clone)]
pub struct DerivationTree {
    pub symbol: String,
    pub children: std::option::Option<Vec<Box<DerivationTree>>>,
}

impl PartialEq for DerivationTree {
    fn eq(&self, rhs: &DerivationTree) -> bool {
        return self.symbol == rhs.symbol && self.children == rhs.children;
    }
}
pub static mut ELAPSED:u128 = 0;
pub static mut CALL_COUNT: u64 = 0;
lazy_static! {
    pub static ref DERIVATION_TREE: DerivationTree = DerivationTree {
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
    log: Union<bool, usize>,
    expand_node: std::option::Option<fn(&Self, &mut u64, &DerivationTree) -> DerivationTree>,
    derivation_tree: std::option::Option<DerivationTree>,
}

impl<'l_use> GrammarsFuzzer<'l_use> {
    pub fn new(
        grammar: &Grammar<'l_use>,
        start_symbol: &'l_use str, //= START_SYMBOL
        min_nonterminals: usize,   //= 0,
        max_nonterminals: usize,   //= 10,
        log: Union<bool, usize>,
    ) -> Self {
        Self {
            grammar: grammar.clone(),
            start_symbol: start_symbol,
            min_nonterminals: min_nonterminals,
            max_nonterminals: max_nonterminals,
            log: log,
            expand_node: None,
            derivation_tree: None,
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
        seed: &mut u64,
        node: &DerivationTree,
        children_alternatives: &Vec<Vec<DerivationTree>>,
    ) -> usize {
       return  get_rand(seed) % children_alternatives.len();
    }

    pub fn expansion_to_children(&self, expansion: &Expansion<'l_use>) -> Vec<DerivationTree> {
        return expansion_to_children(expansion);
    }

    fn process_chosen_children(
        &self,
        chosen_children: &Vec<DerivationTree>,
        expansion: &Expansion,
    ) -> Vec<Box<DerivationTree>> {
        return chosen_children
            .iter()
            .map(|subtree| Box::new(subtree.clone()))
            .collect();
    }
    pub fn expand_node_randomly(
        &self,
        seed: &mut u64,
        node: &DerivationTree,
    ) -> DerivationTree {
        let (symbol, children) = (&node.symbol, &node.children);
        assert!(children.is_none());

        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("Expanding {} randomly", all_terminals(node));
                }
            }
            Union::OnlyB(_) => {}
        }
        
        let expansions = &self.grammar[symbol];
        
        let children_alternatives: Vec<Vec<DerivationTree>> = expansions
            .iter()
            .map(|exp| self.expansion_to_children(exp))
            .collect();


        
        let index = self.choose_node_expansion(seed, node, &children_alternatives);
        let chosen_children = &children_alternatives[index];

        let chosen_children = self.process_chosen_children(chosen_children, &expansions[index]);

        return DerivationTree {
            symbol: symbol.clone(),
            children: Some(chosen_children),
        };
    }

    pub fn possible_expansions(&self, node: &DerivationTree) -> usize {
        match &(&node).children{
            None => 1,
            Some(children) =>
            children.iter().fold(0, |acc, child_node| {
                acc + self.possible_expansions(child_node)
            })
        }

    }
    pub fn any_possible_expansions(&self, node: &DerivationTree) -> bool {      
        match &(&node).children{
            Some(node_children)  =>{
                node_children
                    .iter()
                    .any(|child| {
                    self.any_possible_expansions(child)})
            },
            None => {true}
        }  
    }

    pub fn choose_tree_expansion(
        &self,
        seed: &mut u64,
        tree: &DerivationTree,
        children: &Vec<Box<DerivationTree>>,
    ) -> usize {
       
        return get_rand(seed) % children.len();
    }

    pub fn expand_tree_once(&mut self, seed: &mut u64, tree: &DerivationTree) -> DerivationTree {
        let mut tree = tree.clone();

        match &(&tree).children {
            None => self.expand_node.unwrap()(self, seed, &tree),
            Some(children) =>{

                let mut updated_children = children.clone();
                let expandable_children: Vec<Box<DerivationTree>> = updated_children
                    .iter()
                    .filter(|refref_child| 
                        refref_child.children.is_none() ||
                        self.any_possible_expansions(refref_child))
                    .map(|refref_child| refref_child.clone())
                    .collect();

                let index_map: Vec<usize> = updated_children
                .iter()
                .enumerate()
                .filter(|(_,c)| {
                    expandable_children.iter().find(|expandable_children| **expandable_children == **c).is_some()
                })
                .map(|(i, _)| i)
                .collect();
    
            let child_to_be_expanded = self.choose_tree_expansion(seed,&tree, &expandable_children);
    
            updated_children[index_map[child_to_be_expanded]] =
                Box::new(self.expand_tree_once(seed, &expandable_children[child_to_be_expanded]));
            tree.children = Some(updated_children);
            tree
            }
        }
    }
    pub fn symbol_cost(&self, symbol: &String, seen: &HashSet<String>) -> f64 {
        let expansions = &self.grammar[symbol];
        expansions
            .iter()
            .map(|expansion| self.expansion_cost(&expansion, seen | &HashSet::from([symbol.clone()])))
            .reduce(f64::min)
            .unwrap()
    }

    pub fn expansion_cost(&self, expansion: &Expansion, seen: HashSet<String>) -> f64 {
        let symbols = nonterminals(expansion);
        if symbols.len() == 0 {
            return 1.0;
        }

        if symbols.iter().any(|s| seen.contains(s)) {
            return f64::INFINITY;
        }

        return symbols.iter().map(|sym| self.symbol_cost(&sym, &seen)).sum::<f64>()  + 1.0;
    }

    pub fn expand_node_by_cost(
        &self,
        seed: &mut u64,
        node: &DerivationTree,
        choose: fn(f64, f64) -> f64,
    ) -> DerivationTree {
        let (symbol, children) = (node.symbol.clone(), &node.children);
        assert!(children.is_none());
        let expansions = &self.grammar[&symbol];

        let children_alternatives_with_cost: Vec<_> = expansions
            .iter()
            .map(|exp| {
                (
                    self.expansion_to_children(exp),
                    self.expansion_cost(exp, HashSet::from([symbol.clone()])),
                    exp,
                )
            })
            .collect();
        
        let costs: Vec<_> = children_alternatives_with_cost
            .iter()
            .map(|(_, cost, _)| cost)
            .cloned()
            .collect();

        let chosen_cost = costs
            .iter()
            .fold(costs[0], |chosen_cost, x| choose(chosen_cost, *x));
        
        let children_alternatives_with_chosen_cost: Vec<_> = children_alternatives_with_cost
            .iter()
            .filter(|(_, child_cost, _)| {
                *child_cost == chosen_cost
            })
            .collect();
        
        let children_with_chosen_cost: Vec<Vec<_>> = children_alternatives_with_chosen_cost
            .iter()
            .map(|(child, _, _)| child.clone())
            .collect();
       
        let expansion_with_chosen_cost: Vec<_> = children_alternatives_with_chosen_cost
            .iter()
            .map(|(_, _, expansion)| expansion)
            .collect();

        let index = self.choose_node_expansion(seed, node, &children_with_chosen_cost);
        let chosen_children = &children_with_chosen_cost[index];
        let chosen_expansion = expansion_with_chosen_cost[index];
        let chosen_children = self.process_chosen_children(&chosen_children, chosen_expansion);
 
        return DerivationTree {
            symbol: symbol,
            children: Some(chosen_children),
        };
    }

    pub fn expand_node_min_cost(
        &self,
        seed: &mut u64,
        node: &DerivationTree,
    ) -> DerivationTree {
        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("Expanding {} at minimum cost", all_terminals(node));
                }
            }
            Union::OnlyB(_) => {}
        }
        self.expand_node_by_cost(seed, node, f64::min)
    }

    pub fn expand_node_max_cost(
        &self,
        seed: &mut u64,
        node: &DerivationTree,
    ) -> DerivationTree {
        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("Expanding {} at maximum cost", all_terminals(node));
                }
            }
            Union::OnlyB(_) => {}
        }
        self.expand_node_by_cost(seed, node, f64::max)
    }

    pub fn log_tree(&self, tree: &DerivationTree) {
        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("Tree:{}", all_terminals(tree));
                }
            }
            Union::OnlyB(_) => {}
        }
    }

    fn expand_tree_with_strategy(
        &mut self,
        seed: &mut u64,
        tree: &DerivationTree,
        expand_node_method: fn(&Self, &mut u64, &DerivationTree) -> DerivationTree,
        limit: std::option::Option<usize>, // = None
    ) -> DerivationTree {
        let mut tree = tree.clone();
        self.expand_node = Some(expand_node_method);
       

        while (limit.is_none() || self.possible_expansions(&tree) < limit.unwrap())
        && self.any_possible_expansions(&tree)
        {
                  
            tree = self.expand_tree_once(seed,&tree);
            self.log_tree(&tree)
        }

        return tree;
    }

    pub fn expand_tree(&mut self,  seed: &mut u64,
        tree: &DerivationTree) -> DerivationTree {
        self.log_tree(tree);
        
        let mut tree = tree.clone();
        tree = self.expand_tree_with_strategy(
                seed,
            &tree,
            Self::expand_node_max_cost,
            Some(self.min_nonterminals),
        );

     
        tree = self.expand_tree_with_strategy(
                seed,
            &tree,
            Self::expand_node_randomly,
            Some(self.max_nonterminals),
        );


        tree = self.expand_tree_with_strategy(seed, &tree, Self::expand_node_min_cost, None);

        assert!(self.possible_expansions(&tree) == 0);

        return tree;
    }
    pub fn fuzz_tree(&mut self, seed: &mut u64) -> DerivationTree {
        let mut tree = self.init_tree();
        tree = self.expand_tree(seed, &tree);
        match self.log {
            Union::OnlyA(should_log) => {
                if should_log {
                    println!("{}", all_terminals(&tree));
                }
            }
            Union::OnlyB(_) => {}
        }
        return tree;
    }

    pub fn fuzz(&mut self, rand_seed: &mut u64) -> String {
        let fuzzed_tree = self.fuzz_tree(rand_seed);
        self.derivation_tree = Some(fuzzed_tree.clone());
        return all_terminals(&fuzzed_tree);
    }
}

pub fn get_rand(seed: &mut u64) -> usize{
    
    let mut hasher = FxHasher::default();
    seed.hash(&mut hasher);
    *seed = hasher.finish();
    return (*seed>> 32) as usize;
}

pub fn expansion_to_children<'l_use>(expansion: &Expansion<'l_use>) -> Vec<DerivationTree> {
    
    let expansion = exp_string(&expansion);
    if expansion == "" {
        return vec![DerivationTree {
            symbol: "".to_string(),
            children: Some(Vec::new()),
        }];
    }

    let mut strings: Vec<&str> = Vec::with_capacity(8); 
    let mut last_match_end = 0;
        for mat in RE_NONTERMINAL.find_iter(&expansion) {
            let start_index = mat.start();
            let matched_text = mat.as_str();
            let unmatched_text = &expansion[last_match_end..start_index];
            if !unmatched_text.is_empty(){
            strings.push(&unmatched_text);
            }
            strings.push(&matched_text);
            last_match_end = mat.end();
        }
        let unmatched_text_after_last_match = &expansion[last_match_end..];
        if !unmatched_text_after_last_match.is_empty(){
            strings.push(&unmatched_text_after_last_match);
        }


    let result = strings
        .iter()
        .map(|s| {
            if is_nonterminal(s) {
                DerivationTree {
                    symbol: s.to_string(),
                    children: None,
                }
            } else {
                DerivationTree {
                    symbol: s.to_string(),
                    children: Some(Vec::new()),
                }
            }
        })
        .collect();

    return result;
}

pub fn tree_to_string(tree: &DerivationTree) -> String {

    match &(&tree).children {
        Some(children) =>{
            let nodes: Vec<String> = children
            .iter()
            .map(|nonterm_node| tree_to_string(&nonterm_node))
            .collect();
        nodes.join("")
        }
        None =>{
            if is_nonterminal(&tree.symbol) {
                "".to_string()
            } else {
                tree.symbol.clone()
            }
        }

    }
}

pub fn all_terminals(tree: &DerivationTree) -> String {
    match &(&tree).children {
        None => tree.symbol.clone(),
        Some(children) =>{
            if children.len() == 0 {
                tree.symbol.clone()
            }else{
                let terminals: Vec<String> = children
                .iter()
                .map(|nonterm_node| all_terminals(&nonterm_node))
                .collect();
        
            terminals.join("")
            }
    
        }
    }
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
