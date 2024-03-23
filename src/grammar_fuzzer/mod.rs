use lazy_static::lazy_static;
use regex::Regex;
mod test;
pub type DerivationTree<'l_use> = (String, std::option::Option<Vec<& 'l_use dyn std::any::Any>>);
pub struct GrammarsFuzzer{
}

impl GrammarsFuzzer{
    pub fn new() -> Self{
        Self{}
    }
}

pub fn dot_escape(s: &String, mut show_ascii: std::option::Option<bool>) -> String{

    let mut s = s.clone();
    let mut escaped_s = String::with_capacity(32);
    if show_ascii.is_none(){
        show_ascii = Some(s.len() == 1); 
    }
    let should_show_ascii = show_ascii.unwrap();

    if should_show_ascii && s == "\n"{
        return String::from("\\\\n (10)");
    }
     

    s = s.replace("\n", "\\n");
    for c in s.chars(){
        if c == '\\' || c== ',' || c== '<' || c=='>' || c== '\"'{
            escaped_s = escaped_s + "\\";
            escaped_s.push(c);
        }else if c.is_ascii() && 31 < c as u8{
            escaped_s.push(c);
        }else{
            escaped_s = escaped_s + "\\\\x" + format!("{:02x}",c as u8).as_str();
        }
           

        if should_show_ascii{
            escaped_s = escaped_s + format!(" ({})", c as u8).as_str();
        }
           
    }


    return escaped_s
}
