use fuzzingbook_rs::grammar::options::exp_string;
use fuzzingbook_rs::grammar::str_helper::*;
use fuzzingbook_rs::{grammar::*, grammar_fuzzer};
use std::collections::*;
use fuzzingbook_rs::grammar_fuzzer::*;
use regex::Regex;
fn main() {
    let mut rd = rand::thread_rng();
    let mut expr_grammar: Grammar = HashMap::new();

    expr_grammar.insert(
        "<start>".to_string(),
        vec![Union::OnlyA("<expr>".to_string())],
    );
    expr_grammar.insert(
        "<expr>".to_string(),
        vec![
            Union::OnlyA("<term> + <expr>".to_string()),
            Union::OnlyA("<term> - <expr>".to_string()),
            Union::OnlyA("<term>".to_string()),
        ],
    );
    expr_grammar.insert(
        "<term>".to_string(),
        vec![
            Union::OnlyA("<factor> * <term>".to_string()),
            Union::OnlyA("<factor> / <term>".to_string()),
            Union::OnlyA("<factor>".to_string()),
        ],
    );
    expr_grammar.insert(
        "<factor>".to_string(),
        vec![
            Union::OnlyA("+<factor>".to_string()),
            Union::OnlyA("-<factor>".to_string()),
            Union::OnlyA("(<expr>)".to_string()),
            Union::OnlyA("<integer>.<integer>".to_string()),
            Union::OnlyA("<integer>".to_string()),
        ],
    );
    expr_grammar.insert(
        "<integer>".to_string(),
        vec![
            Union::OnlyA("<digit><integer>".to_string()),
            Union::OnlyA("<digit>".to_string()),
        ],
    );
    expr_grammar.insert("<digit>".to_string(), range_chars_as_str(CharRange::Digit));


    let k = expansion_to_children(&Union::OnlyA("<term> + <expr>".to_string()));
    println!("k[0].symbol: {}", k[0].symbol);
    let mut k = GrammarsFuzzer::new(&expr_grammar, 
        "<start>", 
    3, 
    5, Union::OnlyA(true));
    println!("{}",k.fuzz(&mut rd));


        
}
