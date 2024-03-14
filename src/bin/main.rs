
use std::any::Any;
use std::{collections::*, hash::Hash};
use regex::*;
use fuzzingbook_rs::grammar::*;
use fuzzingbook_rs::grammar::str_helper::*;


fn main() {

    let mut rd = rand::thread_rng();
    let mut expr_grammar: Grammar = HashMap::new();

    expr_grammar.insert("<start>", vec![Union::OnlyA("<expr>".to_string())]);
    expr_grammar.insert(
        "<expr>",
        vec![Union::OnlyA("<term> + <expr>".to_string()), Union::OnlyA("<term> - <expr>".to_string()), Union::OnlyA("<term>".to_string())],
    );
    expr_grammar.insert(
        "<term>",
        vec![Union::OnlyA("<factor> * <term>".to_string()), Union::OnlyA("<factor> / <term>".to_string()), Union::OnlyA("<factor>".to_string())],
    );
    expr_grammar.insert(
        "<factor>",
        vec![
            Union::OnlyA("+<factor>".to_string()),
            Union::OnlyA("-<factor>".to_string()),
            Union::OnlyA("(<expr>)".to_string()),
            Union::OnlyA("<integer>.<integer>".to_string()),
            Union::OnlyA("<integer>".to_string()),
        ],
    );
    expr_grammar.insert("<integer>", vec![Union::OnlyA("<digit><integer>".to_string()), Union::OnlyA("<digit>".to_string())]);
    expr_grammar.insert(
        "<digit>",
        range_chars_as_str(CharRange::Digit),
    );

    //let new_grammar = extend_grammar(&grammars, extension);
    
    let term = simple_grammar_fuzzer(&mut rd, &expr_grammar, "<start>", 10, 10, false).unwrap();
    print!("{term}");
}
