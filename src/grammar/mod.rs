use rand::prelude::*;
use regex::Regex;
use std::collections::HashMap;
mod test;

#[derive(Clone)]
pub enum Any{
    Usize(usize), Str(String), Tuple((Vec<String>, String))
}

#[derive(Clone)]
pub enum Union<A, B>{
    OnlyA(A), OnlyB(B)//, BOTH(A,B)
}
pub type Option  = HashMap<String, Any>;
pub type Expansion = Union<String, (String, Option)>;
pub type Grammar = HashMap<String, Vec<Expansion>>;

pub fn nonterminals(expansion: &Expansion, re: &Regex) -> Vec<String> {
   let expansion = match expansion{
        Union::OnlyA(only_str) =>{
            only_str.clone()
        },
        Union::OnlyB(str_and_opt) =>{
         str_and_opt.0.clone()
        }
    };

    let ret = re
        .find_iter(&expansion)
        .map(|m| String::from(m.as_str()))
        .collect();
    return ret;
}
pub fn extend_grammar(grammar: &Grammar, extension: &Grammar)-> Grammar{
    let mut result = grammar.clone();
    for extension_tuple in extension{
        match result.get_mut(extension_tuple.0){
            Some(ref_result) =>{
                *ref_result = extension_tuple.1.clone();
            },None =>{
                result.insert(extension_tuple.0.clone(), extension_tuple.1.clone());
            }
        }
    }
    result
}

pub fn srange(sentence: & [char]) -> Vec<Expansion>{
    let mut result = Vec::with_capacity(sentence.len());
    for c in sentence{
        let k = format!("{}", c.clone());
        result.push(Union::OnlyA(k))
    }
    result
}

pub fn crange(start_char: char, end_char: char) -> Result<Vec<Expansion>, & 'static str>{
    let diff = end_char as i32 - start_char as i32;
    if diff < 0 {
        return Err("character range is wrong!");
    } else{
        let abs_diff = diff as usize;
        let mut result = Vec::with_capacity(abs_diff);
        for ascii_as_usize in start_char as u8..=end_char as u8{
            let k = format!("{}", ascii_as_usize as char);
            result.push(Union::OnlyA(k))
        }
        return Ok(result);
    }
}
pub fn new_symbol(grammar: &Grammar, symbol_name: &String) -> String{
    match grammar.get(symbol_name){
        Some(_) =>{
            let mut count = 1;
            loop{
                let mut symbol_copy = symbol_name.clone();
                symbol_copy.pop();
                let tentative_symbol_name = format!("{}-{}>", symbol_copy, count);
                if !grammar.contains_key(&tentative_symbol_name){
                    return tentative_symbol_name;
                }
                count += 1
            }
        },
        None => {return String::from(symbol_name);}
    }
}


pub fn opts(a: &[(String, Any)]) -> Option{
    let mut result = HashMap::new();
    for it in a{
        result.insert(it.0.clone(), it.1.clone());
    }
    result
}
pub fn simple_grammar_fuzzer(
    rd: &mut ThreadRng,
    re: &Regex,
    syntax: &Grammar,
    start_symbol: &String,
    max_nonterminals: usize,
    max_expansion_trials: usize,
    log: bool,
) -> Result<String, &'static str> {
    let mut term = String::from(start_symbol);
    let mut expansion_trials = 0;

    while nonterminals(&Union::OnlyA(term.clone()), re).len() > 0 {
        let none_terminals = nonterminals(&Union::OnlyA(term.clone()), re);
        let rand_var = rd.gen_range(0..none_terminals.len());
        let symbol_to_expand = none_terminals[rand_var].clone();

        let expansions = &syntax[symbol_to_expand.as_str()];

        let rand_var2 = rd.gen_range(0..expansions.len());
        let expansion = &expansions[rand_var2];

        let expansion = match expansion{
            Union::OnlyA(a) =>{
                a.clone()
            },
            Union::OnlyB(b) =>{
                b.0.clone()
            }
        };

        let new_term = term.replacen(&symbol_to_expand, &expansion, 1);

        if nonterminals(&Union::OnlyA(new_term.clone()), re).len() < max_nonterminals {
            term = new_term;
            if log {
                println!(
                    "{:<40} {}",
                    format!("{symbol_to_expand} -> {expansion}"),
                    term
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