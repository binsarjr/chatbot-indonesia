// const SpellChecker = require('')

// const checker = new SpellChecker.Spellchecker()
// checker.add('word')
// console.log(SpellChecker.getCorrectionsForMisspelling('wrod'))
// console.log(checker.getCorrectionsForMisspelling('wrod'))

import { Tokenizer } from "./nlp";
var SpellChecker = require('simple-spellchecker');
let dictionary = SpellChecker. getDictionarySync("normal",'dataset/words_correction/id'); 
// var misspelled = ! dictionary.spellCheck('sya');/
Tokenizer.word_tokenizer('sya hrus kmbali bkerja').forEach((word: string) => {
    var suggestions = dictionary.getSuggestions(word);
    console.log(suggestions)
})
// if(misspelled) {
// }