use fuzzingbook_rs::grammar::options::exp_string;
use fuzzingbook_rs::grammar::str_helper::*;
use fuzzingbook_rs::{grammar::*, grammar_fuzzer};
use std::collections::*;
use fuzzingbook_rs::grammar_fuzzer::*;
use std::time::{Duration, Instant};
fn main() {
    let mut rd = rand::thread_rng();
    let mut expr_grammar:Grammar = HashMap::new();
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


    let mut xml_grammar: Grammar = HashMap::new();
    xml_grammar.insert(
        "<start>".to_string(),
        vec![Union::OnlyA("<xml-tree>".to_string())],
    );
    xml_grammar.insert(
        "<xml-tree>".to_string(),
        vec![Union::OnlyA("<text>".to_string()),
        Union::OnlyA("<xml-open-tag><xml-tree><xml-close-tag>".to_string()),
        Union::OnlyA("<xml-openclose-tag>".to_string()),
        Union::OnlyA("<xml-tree><xml-tree>".to_string())],
    );
    xml_grammar.insert(
        "<xml-open-tag>".to_string(),
        vec![Union::OnlyA("<<id>>".to_string()),
        Union::OnlyA("<<id> <xml-attribute>>".to_string())],
    );
    xml_grammar.insert(
        "<xml-openclose-tag>".to_string(),
        vec![Union::OnlyA("<<id>/>".to_string()),
        Union::OnlyA("<<id>/> <xml-attribute>/>".to_string())],
    );
    xml_grammar.insert(
        "<xml-close-tag>".to_string(),
        vec![Union::OnlyA("</<id>>".to_string())],
    );
    xml_grammar.insert(
        "<xml-attribute>".to_string(),
        vec![Union::OnlyA("<id>=<id>".to_string()),
        Union::OnlyA("<xml-attribute> <xml-attribute>".to_string())],
    );
    xml_grammar.insert(
        "<id>".to_string(),
        vec![Union::OnlyA("<letter>".to_string()),
        Union::OnlyA("<id><letter>".to_string())],
    );

    xml_grammar.insert(
        "<text>".to_string(),
        vec![Union::OnlyA("<text><letter-space>".to_string()),
        Union::OnlyA("<letter-space>".to_string())],
    );

    let mut vec1= range_chars_as_str(CharRange::Digit);
    vec1.append(&mut range_chars_as_str(CharRange::Letters));
    vec1.append(&mut vec![Union::OnlyA("\\".to_string()), Union::OnlyA("'".to_string())]);

    let mut letter_vec = vec1.clone();
    letter_vec.push(Union::OnlyA("'".to_string()));

    let mut letter_space_vec = vec1.clone();
    letter_space_vec.append(&mut vec![Union::OnlyA("\t".to_string()), Union::OnlyA(" ".to_string())]);

    xml_grammar.insert("<letter>".to_string(), letter_vec);
    xml_grammar.insert("<letter-space>".to_string(),letter_space_vec);

    let mut f = GrammarsFuzzer::new(&expr_grammar,"<start>",0,20, Union::OnlyA(false));

    let mut x_y_s = BTreeMap::new();
    for _ in 0..50{
        let now = Instant::now();
        let k = f.fuzz(&mut rd);
        x_y_s.insert(k.len(), now.elapsed().as_secs_f64());
    }
    println!("{:?}", x_y_s)

    
   
        
}
