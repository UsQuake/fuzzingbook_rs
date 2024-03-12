#[cfg(test)]
mod tests{
use std::collections::*;
use regex::*;
use crate::grammar::*;

    #[test]
    fn test_crange(){
        let answer:Vec<Expansion> = vec![Union::OnlyA(String::from("0")),Union::OnlyA(String::from("1")),Union::OnlyA(String::from("2")),Union::OnlyA(String::from("3"))];
        let precision = crange('0', '3').unwrap();
        assert_eq!(answer.len(), precision.len());
        for i in 0..precision.len(){
            match &answer[i]{
                Union::OnlyA(s) =>{
                    assert_eq!(*s , format!("{i}"))
                },
                Union::OnlyB(s) =>{
                    panic!("Not expected type!");
                }
            }
        }
      

    }
    #[test]
    fn test_new_symbol(){
        let mut grammars: Grammar = HashMap::new();
        let re = Regex::new(r"(<[^<> ]*>)").unwrap();
        let mut rd = rand::thread_rng();
        grammars.insert(String::from("<start>"), vec![Union::OnlyA(String::from("<expr>"))]);
        grammars.insert(
            String::from("<expr>"),
            vec![Union::OnlyA(String::from("<term> + <expr>")), Union::OnlyA(String::from("<term> - <expr>")), Union::OnlyA(String::from("<term>"))],
        );
        grammars.insert(
            String::from("<term>"),
            vec![Union::OnlyA(String::from("<factor> * <term>")), Union::OnlyA(String::from("<factor> / <term>")), Union::OnlyA(String::from("<factor>"))],
        );
        grammars.insert(
            String::from("<factor>"),
            vec![
                Union::OnlyA(String::from("+<factor>")),
                Union::OnlyA(String::from("-<factor>")),
                Union::OnlyA(String::from("(<expr>)")),
                Union::OnlyA(String::from("<integer>.<integer>")),
                Union::OnlyA(String::from("<integer>")),
            ],
        );
        grammars.insert(String::from("<integer>"), vec![Union::OnlyA(String::from("<digit><integer>")), Union::OnlyA(String::from("<digit>"))]);
        grammars.insert(
            String::from("<digit>"),
            vec![Union::OnlyA(String::from("0")), Union::OnlyA(String::from("1")), Union::OnlyA(String::from("2")),
            Union::OnlyA(String::from("3")),Union::OnlyA(String::from("4")),Union::OnlyA(String::from("5")),Union::OnlyA(String::from("6")),
            Union::OnlyA(String::from("7")),Union::OnlyA(String::from("8")),Union::OnlyA(String::from("9"))],
        );
        
        assert_eq!(new_symbol(&grammars, &String::from("<expr>")), String::from("<expr-1>"));
    }
}

