use super::Expansion;

static ASCII_LETTERS:[&'static str;52] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
static ASCII_DIGITS: [&'static str;10] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


enum CharRange{
    Digit, Letters
}
fn range_chars_as_str<'l_use>(type_of_range:CharRange) -> Vec<Expansion<'l_use>>{
    match type_of_range{
        CharRange::Digit => {
            let mut res = Vec::with_capacity(ASCII_DIGITS.len());
            for st in ASCII_DIGITS{
                res.push(super::Union::OnlyA(st));
            }
            return res;
        },
        CharRange::Letters => {
            let mut res = Vec::with_capacity(ASCII_LETTERS.len());
            for st in ASCII_LETTERS{
                res.push(super::Union::OnlyA(st));
            }
            return res;
        },
    }
}



