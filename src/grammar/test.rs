#[cfg(test)]
mod tests{
use std::collections::*;
use regex::*;
use crate::grammar::*;


    #[test]
    fn test_new_symbol(){
        let mut grammars: Grammar = HashMap::new();
        let re = Regex::new(r"(<[^<> ]*>)").unwrap();
        let mut rd = rand::thread_rng();
        grammars.insert("<start>", vec![Union::OnlyA("<expr>")]);
        grammars.insert(
            "<expr>",
            vec![Union::OnlyA("<term> + <expr>"), Union::OnlyA("<term> - <expr>"), Union::OnlyA("<term>")],
        );
        grammars.insert(
            "<term>",
            vec![Union::OnlyA("<factor> * <term>"), Union::OnlyA("<factor> / <term>"), Union::OnlyA("<factor>")],
        );
        grammars.insert(
            "<factor>",
            vec![
                Union::OnlyA("+<factor>"),
                Union::OnlyA("-<factor>"),
                Union::OnlyA("(<expr>)"),
                Union::OnlyA("<integer>.<integer>"),
                Union::OnlyA("<integer>"),
            ],
        );
        grammars.insert("<integer>", vec![Union::OnlyA("<digit><integer>"), Union::OnlyA("<digit>")]);
        grammars.insert(
            "<digit>",
            vec![Union::OnlyA("0"), Union::OnlyA("1"), Union::OnlyA("2"),
            Union::OnlyA("3"),Union::OnlyA("4"),Union::OnlyA("5"),Union::OnlyA("6"),
            Union::OnlyA("7"),Union::OnlyA("8"),Union::OnlyA("9")],
        );
        
        assert_eq!(new_symbol(&grammars, &String::from("<expr>")), String::from("<expr-1>"));
    }
}

