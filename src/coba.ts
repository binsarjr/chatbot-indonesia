const fs = require('fs');
const { SpellCheck } = require('@nlpjs/similarity');
const { NGrams } = require('@nlpjs/utils');

// File book.txt should contain the text that contains the words to be learnt. 
// In the example we used Pride and Prejudice from Project Gutenberg 
const lines = "knowladge this It can do spell check based on a dictionary of words with frequency. It search for the most similar word based on levenshtein distance. When several words has the same levenshtein distance, the word with more frequency is chosen.".split(/\r?\n/);
const ngrams = new NGrams({ byWord: true });
const freqs = ngrams.getNGramsFreqs(lines, 1);
const spellCheck = new SpellCheck({ features: freqs });
console.log(spellCheck)
const actual = spellCheck.check(['knowldge', 'thas', 'prejudize']);
console.log(actual);