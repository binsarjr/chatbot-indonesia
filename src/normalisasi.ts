import fs from "fs";
import { wrap } from "module";
import { Tokenizer,Cleaner } from "./nlp";

const stopword = require('stopword')

let data: any = fs.readFileSync('./normalisasi.txt').toString()
let sentences = Tokenizer.sentence_tokenizer(data)

let results: any[] = []
fs.writeFileSync('./normal.txt','')
sentences.forEach((sentence: string) => {
    let words_filtered: any[] = []
    let words = Tokenizer.word_tokenizer(sentence)
    words.forEach((word: string) => {
        let filter: any[]= '~`!@#$%^&*()-_=+[{]}\\|;:\'"/?.>,<'.split('')
        if(!filter.includes(word)) {
            words_filtered.push(word.toLowerCase())
        }
    })
    console.log(words_filtered.length,'awal')
    words_filtered  =words_filtered.filter(function(elem, pos) {
        if(!results.includes(elem)) {
            return words_filtered.indexOf(elem) == pos;
        }
    })
    console.log(words_filtered.length,'akhir')

    results = [...results,...words_filtered]
})

// 600235
results.sort()
console.log(results.slice(0,100))
console.log(results.length,'done')

fs.appendFileSync('./normal.txt',results.join("\n"))