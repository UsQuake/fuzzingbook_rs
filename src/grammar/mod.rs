mod options;
mod test;
mod str_helper;
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
    OnlyA(A), OnlyB(B)//, BOTH(A,B)
}

pub type Expansion<'l_use> = Union<& 'l_use str, (& 'l_use str, Option<'l_use>)>;
pub type Grammar<'l_use> = HashMap<& 'l_use str, Vec<Expansion<'l_use>>>;

pub fn nonterminals<'l_use>(expansion: &Expansion<'l_use>, re: &Regex) -> Vec<& 'l_use str> {
   let expansion = match expansion{
        Union::OnlyA(only_str) =>{
            only_str
        },
        Union::OnlyB(str_and_opt) =>{
         str_and_opt.0
        }
    };

    let ret = re
        .find_iter(&expansion)
        .map(|m| m.as_str())
        .collect();
    return ret;
}
pub fn extend_grammar<'l_use>(grammar: &Grammar<'l_use>, extension: Grammar<'l_use>)-> Grammar<'l_use>{
    let mut result = grammar.clone();
    for extension_tuple in extension{
        match result.get_mut(&extension_tuple.0){
            Some(ref_result) =>{
                *ref_result = extension_tuple.1;
            },None =>{
                result.insert(extension_tuple.0, extension_tuple.1);
            }
        }
    }
    result
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
    re: &Regex,
    syntax: &Grammar,
    start_symbol: & 'l_use str,
    max_nonterminals: usize,
    max_expansion_trials: usize,
    log: bool,
) -> Result<String, &'static str> {
    let mut term = String::from(start_symbol);
    let mut expansion_trials = 0;

    while nonterminals(&Union::OnlyA(&term.clone()), re).len() > 0 {
        let sub_nonterminals = term.clone();
        let none_terminals = nonterminals(&Union::OnlyA(&sub_nonterminals), re);
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

        if nonterminals(&Union::OnlyA(&new_term), re).len() < max_nonterminals {
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