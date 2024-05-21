use fuzzingbook_rs::grammar::predef_grammars::*;
use fuzzingbook_rs::grammar::str_helper::*;
use fuzzingbook_rs::grammar::*;
use fuzzingbook_rs::grammar_fuzzer::var_ctx::*;
use fuzzingbook_rs::grammar_fuzzer::*;
use regex::Regex;
use std::time::{Duration, Instant};
use std::{
    collections::*,
    time::{SystemTime, UNIX_EPOCH},
};
fn main() {
    let mut f = GrammarsFuzzer::new(&get_python_grammar(), "<start>", 0, 100, Union::OnlyA(false));
    let count: u128 = 1;
    let mut x_y_s = Vec::new();
    //let mut rand_seed = (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis() & ((1<<65) - 1)) as u64;
    let mut rand_seed = 17526186317047798642;
    let initial_seed_copy: u64 = rand_seed.clone();
    for _ in 0..count {
        let now = Instant::now();
        let mutated_seed_copy: u64 = rand_seed.clone();
        let testcase = f.fuzz(&mut rand_seed);
        //let testcase = simple_grammar_fuzzer(&expr_grammar,"<start>", 15, 30, false).unwrap();
        let elapsed = now.elapsed().as_millis();
        x_y_s.push((testcase.len(), elapsed, testcase, mutated_seed_copy));
    }
    //17545 2.4s

    let mut i = 0;

    for (_,elapsed, testcase, _) in &x_y_s {
        i += elapsed;
        ir_to_ctx(testcase);
    }
    let avg = i / count;
    println!("average elapsed time: {avg}ms");
}
