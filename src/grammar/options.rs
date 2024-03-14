use std::collections::{HashMap};
use crate::grammar::{Expansion, Union};
use std::any::Any;

pub type Option<'l_use>  = HashMap<&'l_use str, &'l_use dyn Any>;


pub fn opts<'l_use>(a: &[(&'l_use str, &'l_use dyn Any)]) -> Option<'l_use>{
    let mut result = HashMap::new();
    for it in a{
        result.insert(it.0, it.1);
    }
    result
}

pub fn exp_string<'l_use>(expansion: &Expansion<'l_use>) -> String{
    match expansion{
        Union::OnlyA(str_only) =>{
            str_only.clone()
        },
        Union::OnlyB(str_and_map)=>{
            str_and_map.0.clone()
        }
    }
}

pub fn exp_opts<'l_use>(expansion: &Expansion<'l_use>) -> HashMap<&'l_use str, &'l_use dyn Any>{
    match expansion{
        Union::OnlyA(_) =>{
            HashMap::new()
        },
        Union::OnlyB(str_and_map)=>{
            str_and_map.1.clone()
        }
    }
}

pub fn exp_opt<'l_use>(expansion: &Expansion<'l_use>, attribute: &'l_use str) -> std::option::Option<&'l_use dyn Any>{
    match exp_opts(&expansion).get(attribute){
        Some(ref_ref) =>{
            Some(ref_ref.clone())
        } None=> None
    }
}