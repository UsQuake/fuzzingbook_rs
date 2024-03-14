#[cfg(test)]
mod tests{
use std::collections::*;
use regex::*;
use crate::grammar::*;

    #[test]
    fn test_new_symbol(){
        let mut grammars: Grammar = HashMap::new();
  
        grammars.insert("<start>", vec![Union::OnlyA("<expr>".to_string())]);
        grammars.insert(
            "<expr>",
            vec![Union::OnlyA("<term> + <expr>".to_string()), Union::OnlyA("<term> - <expr>".to_string()), Union::OnlyA("<term>".to_string())],
        );
        grammars.insert(
            "<term>",
            vec![Union::OnlyA("<factor> * <term>".to_string()), Union::OnlyA("<factor> / <term>".to_string()), Union::OnlyA("<factor>".to_string())],
        );
        grammars.insert(
            "<factor>",
            vec![
                Union::OnlyA("+<factor>".to_string()),
                Union::OnlyA("-<factor>".to_string()),
                Union::OnlyA("(<expr>)".to_string()),
                Union::OnlyA("<integer>.<integer>".to_string()),
                Union::OnlyA("<integer>".to_string()),
            ],
        );
        grammars.insert("<integer>", vec![Union::OnlyA("<digit><integer>".to_string()), Union::OnlyA("<digit>".to_string())]);
        grammars.insert(
            "<digit>",
            vec![Union::OnlyA("0".to_string()), Union::OnlyA("1".to_string()), Union::OnlyA("2".to_string()),
            Union::OnlyA("3".to_string()),Union::OnlyA("4".to_string()),Union::OnlyA("5".to_string()),Union::OnlyA("6".to_string()),
            Union::OnlyA("7".to_string()),Union::OnlyA("8".to_string()),Union::OnlyA("9".to_string())],
        );
        
        assert_eq!(new_symbol(&grammars, &String::from("<expr>")), String::from("<expr-1>"));
    }
}

