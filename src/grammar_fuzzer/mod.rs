use lazy_static::lazy_static;
use regex::Regex;
use crate::grammar::*;

mod test;

#[derive(Clone)]
pub struct  DerivationTree{
    symbol: String, 
    children:std::option::Option<Vec<Box<DerivationTree>>>
}
lazy_static!{
    static ref DERIVATION_TREE: DerivationTree = DerivationTree{
        symbol:"<start>".to_string(),
        children: Some(vec![
            Box::from(DerivationTree{
                symbol: "<expr>".to_string(),
                children: Some(vec![
                    Box::new(DerivationTree{
                        symbol: "<expr>".to_string(), 
                        children: None})
                        ,
                    Box::new(DerivationTree{
                        symbol:" + ".to_string(), 
                        children: Some(Vec::new())}), 
                    Box::new(DerivationTree{
                        symbol:"<term>".to_string(), 
                        children:None})
                    ])
                })])
    };
}
  
pub struct GrammarsFuzzer<'l_use>{
    grammar: Grammar<'l_use>,
    start_symbol:&'l_use str, //= START_SYMBOL
    min_nonterminals: usize, //= 0,
    max_nonterminals: usize, //= 10,
    disp: bool,// = False,
    log: Union<bool, usize>
}

impl<'l_use> GrammarsFuzzer<'l_use>{
    pub fn new(
        grammar: &Grammar<'l_use>,
        start_symbol:&'l_use str, //= START_SYMBOL
        min_nonterminals: usize, //= 0,
        max_nonterminals: usize, //= 10,
        disp: bool,// = False,
        log: Union<bool, usize>) -> Self{ //= False
        Self{
            grammar:grammar.clone(),
            start_symbol:start_symbol,
            min_nonterminals:min_nonterminals,
            max_nonterminals:max_nonterminals,
            disp: disp,
            log: log
        }
    }
    def check_grammar(self) -> None:
    """Check the grammar passed"""
    assert self.start_symbol in self.grammar
    assert is_valid_grammar(
        self.grammar,
        start_symbol=self.start_symbol,
        supported_opts=self.supported_opts())

def supported_opts(self) -> Set[str]:
    """Set of supported options. To be overloaded in subclasses."""
    return set()  # We don't support specific options

    def init_tree(self) -> DerivationTree:
    return (self.start_symbol, None)

    def choose_node_expansion(self, node: DerivationTree,
        children_alternatives: List[List[DerivationTree]]) -> int:
"""Return index of expansion in `children_alternatives` to be selected.
'children_alternatives`: a list of possible children for `node`.
Defaults to random. To be overloaded in subclasses."""
return random.randrange(0, len(children_alternatives))
}
def expansion_to_children(expansion: Expansion) -> List[DerivationTree]:
    # print("Converting " + repr(expansion))
    # strings contains all substrings -- both terminals and nonterminals such
    # that ''.join(strings) == expansion

    expansion = exp_string(expansion)
    assert isinstance(expansion, str)

    if expansion == "":  # Special case: epsilon expansion
        return [("", [])]

    strings = re.split(RE_NONTERMINAL, expansion)
    return [(s, None) if is_nonterminal(s) else (s, [])
            for s in strings if len(s) > 0]
pub fn tree_to_string(tree: &DerivationTree)-> String{
    let (symbol, children) = (tree.symbol.clone(), tree.children.clone());

    if children.is_some(){
        let children = children.unwrap();
        let nodes:Vec<String> = children.iter().map(|nonterm_node|{tree_to_string(&nonterm_node)}).collect();
        return nodes.join("");
    }
    else{
        if is_nonterminal(&symbol){
            return "".to_string()
        } else {
            return symbol
        }
    }
     
}

pub fn all_terminals(tree: &DerivationTree) -> String{
    let (symbol, children) = (tree.symbol.clone(), tree.children.clone());
    if children.is_none(){
        return symbol.clone();
    }

    let mut children = children.unwrap();
    if children.len() == 0{
        return symbol.clone();
    }
    let terminals:Vec<String> = children.iter().map(|nonterm_node|{all_terminals(&nonterm_node)}).collect();
    return terminals.join("");
}


pub fn dot_escape(s: &String, mut show_ascii: std::option::Option<bool>) -> String{

    let mut s = s.clone();
    let mut escaped_s = String::with_capacity(32);
    if show_ascii.is_none(){
        show_ascii = Some(s.len() == 1); 
    }
    let should_show_ascii = show_ascii.unwrap();

    if should_show_ascii && s == "\n"{
        return String::from("\\\\n (10)");
    }
     

    s = s.replace("\n", "\\n");
    for c in s.chars(){
        if c == '\\' || c== ',' || c== '<' || c=='>' || c== '\"'{
            escaped_s = escaped_s + "\\";
            escaped_s.push(c);
        }else if c.is_ascii() && 31 < c as u8{
            escaped_s.push(c);
        }else{
            escaped_s = escaped_s + "\\\\x" + format!("{:02x}",c as u8).as_str();
        }
           

        if should_show_ascii{
            escaped_s = escaped_s + format!(" ({})", c as u8).as_str();
        }
           
    }


    return escaped_s
}
