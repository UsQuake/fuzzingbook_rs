
use std::any::Any;
use std::{collections::*, hash::Hash};
use regex::*;
use fuzzingbook_rs::grammar::*;
use fuzzingbook_rs::grammar::str_helper::*;


fn main() {

    let mut rd = rand::thread_rng();
    let mut expr_grammar: Grammar = HashMap::new();

    expr_grammar.insert("<start>".to_string(), vec![Union::OnlyA("<expr>".to_string())]);
    expr_grammar.insert(
        "<expr>".to_string(),
        vec![Union::OnlyA("<term> + <expr>".to_string()), Union::OnlyA("<term> - <expr>".to_string()), Union::OnlyA("<term>".to_string())],
    );
    expr_grammar.insert(
        "<term>".to_string(),
        vec![Union::OnlyA("<factor> * <term>".to_string()), Union::OnlyA("<factor> / <term>".to_string()), Union::OnlyA("<factor>".to_string())],
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
    expr_grammar.insert("<integer>".to_string(), vec![Union::OnlyA("<digit><integer>".to_string()), Union::OnlyA("<digit>".to_string())]);
    expr_grammar.insert(
        "<digit>".to_string(),
        range_chars_as_str(CharRange::Digit),
    );

    //let new_grammar = extend_grammar(&grammars, extension);
    
    //let term = simple_grammar_fuzzer(&mut rd, &expr_grammar, "<start>", 10, 10, false).unwrap();
    //print!("{term}");

    let mut ebnf_grammar : Grammar = HashMap::new();
    ebnf_grammar.insert("<authority>".to_string(), vec![Union::OnlyA("(<userinfo>@)?<host>(:<port>)?".to_string())]);
    let ebnf_grammar = convert_ebnf_grammar(&ebnf_grammar);
    for it in ebnf_grammar{
        print!("{} -> [", it.0);
        for exp in it.1{
            match exp{
                Union::OnlyA(a) => {print!("{}, ", a);},
                Union::OnlyB(b) => {print!("{}, ", b.0);}
            }
        }

        println!("]");
    }

}
