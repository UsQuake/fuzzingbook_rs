mod options;
mod test;
pub mod str_helper;
use self::options::Option;

use rand::prelude::*;
use regex::Regex;
use std::collections::HashMap;


// #[derive(Clone)]
// pub enum Any{
//     Usize(usize), Str(String), Tuple((Vec<String>, String))
// }

#[derive(Clone)]
pub enum Union<A, B>{
    OnlyA(A), OnlyB(B)
}

pub type Expansion<'l_use> = Union<& 'l_use str, (& 'l_use str, Option<'l_use>)>;
pub type Grammar<'l_use> = HashMap<& 'l_use str, Vec<Expansion<'l_use>>>;

static RE_PARENTHESIZED_EXPR:Regex = Regex::new(r"\([^()]*\)[?+*]").unwrap();
static RE_NONTERMINAL: Regex = Regex::new(r"(<[^<> ]*>)").unwrap();

pub fn nonterminals<'l_use>(expansion: &Expansion<'l_use>) -> Vec<& 'l_use str> {
   let expansion = match expansion{
        Union::OnlyA(only_str) =>{
            only_str
        },
        Union::OnlyB(str_and_opt) =>{
         str_and_opt.0
        }
    };

    let ret = RE_NONTERMINAL
        .find_iter(&expansion)
        .map(|m| m.as_str())
        .collect();
    return ret;
}
pub fn extend_grammar<'l_use>(grammar: &Grammar<'l_use>, extension: &Grammar<'l_use>)-> Grammar<'l_use>{
    let mut result = grammar.clone();
    for extension_tuple in extension{
        match result.get_mut(extension_tuple.0){
            Some(ref_result) =>{
                *ref_result = extension_tuple.1.clone();
            },None =>{
                result.insert(extension_tuple.0, extension_tuple.1.clone());
            }
        }
    }
    result
}
fn parenthesized_expressions<'l_use>(expansion: &Expansion<'l_use>) -> Vec<& 'l_use str>{
    let expansion = match expansion{
        Union::OnlyA(s) => s.clone(),
        Union::OnlyB(s_and_map)=> s_and_map.0.clone()
    };
    let ret = RE_PARENTHESIZED_EXPR
    .find_iter(expansion)
    .map(|m| m.as_str())
    .collect();
    return ret;
}

fn convert_ebnf_parentheses<'l_use>(ebnf_grammar: &Grammar<'l_use>, ext: &Grammar<'l_use>) -> Grammar<'l_use>{
    let mut grammar = extend_grammar(&ebnf_grammar, &ext);
    for nonterminal in ebnf_grammar{
        let mut expansions = nonterminal.1;

        for i in 0..expansions.len(){
            let expansion = expansions[i];
            let expansion: Expansion<'l_use> = match expansion{
                Union::OnlyA(st) => Union::OnlyA(st),
                Union::OnlyB(st_and_vec) => Union::OnlyA(st_and_vec.0)
            };

            loop{
                let parenthesized_exprs = parenthesized_expressions(&expansion);
                if parenthesized_exprs.len() == 0{
                    break
                }
                 

                for expr in parenthesized_exprs{
                    operator = expr[-1:];
                    contents = expr[1:-2];

                    new_sym = new_symbol(&grammar);

                    exp = nonterminal.1[i];
                    opts = None;
                    if isinstance(exp, tuple):
                        (exp, opts) = exp
                    //assert isinstance(exp, str)

                    expansion = exp.replace(expr, new_sym + operator, 1)
                    if opts:
                        grammar[nonterminal][i] = (expansion, opts)
                    else:
                        grammar[nonterminal][i] = expansion

                    grammar[new_sym] = [contents]
                }

            }
        }

    }

 

    return grammar
}


pub fn new_symbol<'l_use>(grammar: &Grammar, symbol_name: & 'l_use str) -> String{
    match grammar.get(symbol_name){
        Some(_) =>{
            let mut count = 1;
            loop{
                let mut symbol_copy = String::from(symbol_name);
                symbol_copy.pop();
                let tentative_symbol_name = format!("{}-{}>", symbol_copy, count);
                if !grammar.contains_key(tentative_symbol_name.as_str()){
                    return tentative_symbol_name;
                }
                count += 1
            }
        },
        None => {return String::from(symbol_name);}
    }
}




pub fn simple_grammar_fuzzer<'l_use>(
    rd: &mut ThreadRng,
    syntax: &Grammar,
    start_symbol: & 'l_use str,
    max_nonterminals: usize,
    max_expansion_trials: usize,
    log: bool,
) -> Result<String, &'static str> {
    let mut term = String::from(start_symbol);
    let mut expansion_trials = 0;

    while nonterminals(&Union::OnlyA(&term.clone())).len() > 0 {
        let sub_nonterminals = term.clone();
        let none_terminals = nonterminals(&Union::OnlyA(&sub_nonterminals));
        let rand_var = rd.gen_range(0..none_terminals.len());
        let symbol_to_expand = none_terminals[rand_var];

        let expansions = &syntax[symbol_to_expand];

        let rand_var2 = rd.gen_range(0..expansions.len());
        let expansion = &expansions[rand_var2];

        let expansion = match expansion{
            Union::OnlyA(a) =>{
                a
            },
            Union::OnlyB(b) =>{
                b.0
            }
        };

        let new_term = (&term).replacen(&symbol_to_expand, &expansion, 1);

        if nonterminals(&Union::OnlyA(&new_term)).len() < max_nonterminals {
            term = new_term;
            if log {
                println!(
                    "{:<40} {}",
                    format!("{symbol_to_expand} -> {expansion}"),
                    &term
                )
            }
            expansion_trials = 0;
        } else {
            expansion_trials += 1;
            if expansion_trials >= max_expansion_trials {
                return Err("Cannot expand more!");
            }
        }
    }

    return Ok(term);
}