use std::{collections::*};
use regex::*;
use lazy_static::lazy_static;

type Ident = String;
type Stack<T> = Vec<T>;
type Trait = HashSet<Ident>;
type Var = (Ident, Trait);
type Vars = HashMap<Ident, Trait>;
type Context = Stack<Vars>;

lazy_static! {
    pub static ref RE_VAR_TYPE_EXPR: Regex = Regex::new(r"@[^;]+;").unwrap();
}
fn generate_unique_var_name(already_define_vars:&Vars) ->String{
    let mut result = String::with_capacity(8);
    let mut count = 0;
    while already_define_vars.get(&result).is_some(){
        result = "var".to_string() + &count.to_string();
    }
    result
}

fn get_var_info_from_ir(ir: &String) -> (String,HashSet<String>){
    let mut var_info:Vec<String> = ir.clone().split_off(0).split(':').map(|m|m.to_string()).collect();
    let (var_state, var_traits) = (&var_info[0], &var_info[1]);
    let mut var_traits = var_traits.clone();
    var_traits.pop();
    let var_traits:HashSet<String> = var_traits.split(',').map(|m|m.to_string()).collect();
    (var_state.clone(), var_traits)
}

fn get_splitted_ir_code(ir_code: &String)->Vec<String>{
    let mut split_ir: Vec<String> = Vec::with_capacity(8);
    let mut last_match_end = 0;
    for mat in RE_VAR_TYPE_EXPR.find_iter(&ir_code) {
        let start_index = mat.start();
        let matched_text = mat.as_str();
        let unmatched_text = &ir_code[last_match_end..start_index];
        if !unmatched_text.is_empty() {
            split_ir.push(unmatched_text.to_string());
        }
        split_ir.push(matched_text.to_string());
        last_match_end = mat.end();
    }
    let unmatched_text_after_last_match = &ir_code[last_match_end..];
    if !unmatched_text_after_last_match.is_empty() {
        split_ir.push(unmatched_text_after_last_match.to_string());
    }
    split_ir
}
    pub fn ir_to_ctx(ir_code: &String/* , predefined_ctx:Context*/) -> String{
        let mut res_stack:Context = Vec::new();
        let mut initial_vars:Vars = HashMap::new();
        initial_vars.insert("val0".to_string(), HashSet::from(["Primitive".to_string()]));
        initial_vars.insert("val1".to_string(), HashSet::from(["Primitive".to_string()]));
        initial_vars.insert("val2".to_string(), HashSet::from(["Primitive".to_string()]));
        initial_vars.insert("val3".to_string(), HashSet::from(["Primitive".to_string()]));
        initial_vars.insert("val4".to_string(), HashSet::from(["Any".to_string()]));
        initial_vars.insert("val5".to_string(), HashSet::from(["Any".to_string()]));
        initial_vars.insert("val6".to_string(), HashSet::from(["Any".to_string()]));

        res_stack.push(initial_vars);
        let splitted_ir_code = get_splitted_ir_code(ir_code);
        let mut result_ir_code = splitted_ir_code.clone();
        let mut current_vars = res_stack.last().unwrap().clone();
        for (idx,str) in splitted_ir_code.iter().enumerate(){
            if str.chars().nth(0) == Some('@'){
                let (var_state, var_traits) = get_var_info_from_ir(str);
                let referable_vars:Vec<_> = current_vars.iter().filter(
                    |(_,already_defined_var_traits) |{
                    var_traits.is_subset(already_defined_var_traits)
                }).map(|(already_defined_var_name,_)| already_defined_var_name).collect();
                match var_state.as_str(){
                    "Refer" =>{
                        let rand_num = 0;
                        result_ir_code[idx] = referable_vars[rand_num].clone();
                        dbg!(referable_vars);
                    },
                    "Define" =>{
                        let new_var_name =generate_unique_var_name(&current_vars);
                        current_vars.insert(new_var_name, HashSet::from(["Primitive".to_string()]));
                    },
                    "Assign" =>{
                        let rand_num = 0;
                        let mut generated_statement = referable_vars[rand_num].clone() + " = ";
                        if var_traits.contains("Primitive"){
                            generated_statement = generated_statement + "123"
                        }else if var_traits.contains("Iterable"){
                            generated_statement = generated_statement + "[1,2,3]"
                        }
                        result_ir_code[idx] = generated_statement;
                    }
                    _ =>{}
                }
            }else{
                for ch in str.chars(){
                    if ch == '{'{
                        res_stack.push(current_vars.clone());
                    }else if ch == '}'{
                        res_stack.pop();
                    }
                }
            }

        }
        result_ir_code.join("")
    }





