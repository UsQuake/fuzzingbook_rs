pub type DerivationTree<'l_use> = (String, std::option::Option<Vec<& 'l_use dyn std::any::Any>>);

pub struct GrammarsFuzzer{
}

impl GrammarsFuzzer{
    pub fn new() -> Self{
        Self{}
    }
}