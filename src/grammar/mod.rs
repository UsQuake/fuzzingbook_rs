mod options;
mod test;
pub mod str_helper;
use self::options::Option;

use lazy_static::lazy_static;
use rand::prelude::*;
use regex::Regex;
use std::{any::Any, collections::HashMap};


// #[derive(Clone)]
// pub enum Any{
//     Usize(usize), Str(String), Tuple((Vec<String>, String))
// }

#[derive(Clone)]
pub enum Union<A, B>{
    OnlyA(A), OnlyB(B)
}

pub type Expansion<'l_use> = Union<String, (String, Option<'l_use>)>;
pub type Grammar<'l_use> = HashMap<& 'l_use str, Vec<Expansion<'l_use>>>;

lazy_static!{
    static ref RE_PARENTHESIZED_EXPR : Regex = Regex::new(r"\([^()]*\)[?+*]").unwrap();
    static ref RE_NONTERMINAL : Regex = Regex::new(r"(<[^<> ]*>)").unwrap();
    static ref RE_EXTENDED_NONTERMINAL : Regex = Regex::new(r"(<[^<> ]*>[?+*])").unwrap();
}


pub fn nonterminals<'l_use>(expansion: &Expansion<'l_use>) -> Vec<String> {

   let expansion = match expansion{
        Union::OnlyA(only_str) =>{
            only_str.to_string()
        },
        Union::OnlyB(str_and_opt) =>{
            str_and_opt.0.to_string()
        }
    };

    let ret = RE_NONTERMINAL
        .find_iter(&expansion)
        .map(|m| m.as_str().to_string())
        .collect();
    return ret;
}
pub fn extended_nonterminals<'l_use>(expansion: &Expansion<'l_use>) -> Vec<String>{
    let expansion = match expansion{
        Union::OnlyA(only_str) =>{
            only_str.to_string()
        },
        Union::OnlyB(str_and_opt) =>{
            str_and_opt.0.to_string()
        }
    };

    let ret = RE_EXTENDED_NONTERMINAL
        .find_iter(&expansion)
        .map(|m| m.as_str().to_string())
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
fn parenthesized_expressions<'l_use>(expansion: &Expansion<'l_use>) -> Vec<String>{
    let expansion = match expansion{
        Union::OnlyA(s) => s.clone(),
        Union::OnlyB(s_and_map)=> s_and_map.0.clone()
    };
    let ret = RE_PARENTHESIZED_EXPR
    .find_iter(&expansion)
    .map(|m| m.as_str().to_string())
    .collect();
    return ret;
}

fn convert_ebnf_parentheses<'l_use>(ebnf_grammar: &mut Grammar<'l_use>, ext: &Grammar<'l_use>) -> Grammar<'l_use>{
    let mut grammar = extend_grammar(&ebnf_grammar, &ext);
    for nonterminal in ebnf_grammar.iter_mut(){
        let mut expansions = nonterminal.1.clone();

        for i in 0..expansions.len(){
            let expansion = &expansions[i];
            let expansion: Expansion<'l_use> = match expansion{
                Union::OnlyA(st) => Union::OnlyA(st.clone()),
                Union::OnlyB(st_and_vec) => Union::OnlyA(st_and_vec.0.clone())
            };

            loop{
                let parenthesized_exprs = parenthesized_expressions(&expansion);
                if parenthesized_exprs.len() == 0{
                    break
                }
                 

                for expr in parenthesized_exprs{
                    let operator = &expr[expr.len() - 1..expr.len()];
                    let contents = &expr[1..expr.len() - 2];

                    let mut new_sym = new_symbol(&grammar, "<symbol>");

                    let exp = &nonterminal.1[i];
                    match exp{
                        Union::OnlyA(_) => {panic!("exp is expected to be tuple!");}
                        Union::OnlyB(tuple)=>{
                            let (exp, opts) = tuple;

                            let exp_copy = exp.clone();

                            new_sym.push_str( &operator);
                            let expansion = exp_copy.replacen(&expr, &new_sym, 1);
                            if opts.is_empty(){
                                nonterminal.1[i] = Union::OnlyA(expansion.clone());
                            }else{
                                nonterminal.1[i] = Union::OnlyB((expansion.clone(), opts.clone()));
                            }
                               
                            let ref_new_sym = grammar.get_mut(new_sym.clone().as_str()).unwrap();
                            *ref_new_sym = vec![Union::OnlyA(contents.to_string())];
                        }
                    }
 
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

    while nonterminals(&Union::OnlyA(term.clone())).len() > 0 {
        let sub_nonterminals = term.clone();
        let none_terminals = nonterminals(&Union::OnlyA(sub_nonterminals.clone()));
        let rand_var = rd.gen_range(0..none_terminals.len());
        let symbol_to_expand = &none_terminals[rand_var];

        let expansions = &syntax[&symbol_to_expand.as_str()];

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

        let new_term = (&term).replacen(symbol_to_expand.as_str(), &expansion, 1);

        if nonterminals(&Union::OnlyA(new_term.clone())).len() < max_nonterminals {
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