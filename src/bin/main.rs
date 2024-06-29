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
    let mut f = GrammarsFuzzer::new(
        &get_python_grammar(),
        "<start>",
        10,
        100,
        Union::OnlyA(false),
    );

    //let mut rand_seed = (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis() & ((1<<65) - 1)) as u64;
    let mut rand_seed = 17526186317047798642;
    let testcase = f.fuzz(&mut rand_seed);
    std::fs::write("./testcase.py",  replace_scope_with_indent(&ir_to_ctx(&testcase, &mut rand_seed.clone()))).unwrap();
    
    let native_raw_result = std::process::Command::new("python")
        .arg("testcase.py")
        .output()
        .expect("failed to execute process");
    let native_result_string =  String::from_utf8(native_raw_result.stdout).unwrap();

    let wasi_raw_result = std::process::Command::new("/home/song/js")
    .arg("run-wasi-py.js")
    .arg("--")
    .arg("none")
    .output()
    .expect("failed to execute process");
    let wasi_result_string =  String::from_utf8(wasi_raw_result.stdout).unwrap();
    assert_eq!(native_result_string, wasi_result_string);
}
