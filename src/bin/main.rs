
use std::{collections::*, hash::Hash};
use regex::*;
use fuzzingbook_rs::grammar::*;
fn main() {
    let mut simple_nonterminal_grammar: Grammar = HashMap::new();
    simple_nonterminal_grammar.insert(String::from("<start>"),vec![Union::OnlyA(String::from("<nonterminal>"))]);
    simple_nonterminal_grammar.insert(String::from("<nonterminal>"), vec![Union::OnlyA(String::from("<left-angle><identifier><right-angle>"))]);
    simple_nonterminal_grammar.insert(String::from("<left-angle>"), vec![Union::OnlyA(String::from("<"))]);
    simple_nonterminal_grammar.insert( String::from("<right-angle>"), vec![Union::OnlyA(String::from(">"))]);
    simple_nonterminal_grammar.insert( String::from("<identifier>"), vec![Union::OnlyA(String::from("id"))]);

    let mut extension :Grammar = HashMap::new();
    extension.insert(String::from("<identifier>"), vec![Union::OnlyA(String::from("<idchar>")), Union::OnlyA(String::from("<identifier><idchar>"))]);
    extension.insert(String::from("<idchar>"), vec![Union::OnlyA(String::from("a")),Union::OnlyA(String::from("b")), Union::OnlyA(String::from("c")), Union::OnlyA(String::from("d"))]);

    let k = 97 as char;
    println!("{k}");
}
