const Nalapa = require('nalapa')
const NalapaTokenizer = Nalapa.tokenizer
const NalapaWord = Nalapa.word

var sastrawi = require('sastrawijs');
var stemmer = new sastrawi.Stemmer();

import {
    Word
} from "./index";
import fs from 'fs'

export class Tokenizer {
    static ignore_words = "!,\",#,$,%,&,',(,),*,+,,,-,.,/,:,;,<,=,>,?,@,[,\\,],^,_,`,{,|,},~".split('')

    static word_tokenizer(text: string): any[] {
        return NalapaTokenizer.tokenize(text)
    }

    static sentence_tokenizer(sentence: string): any[] {
        return NalapaTokenizer.splitSentence(sentence)
    }

    static filter_punctuation(tokenized: any[]): any[] {
        let filterd: any[] = []
        tokenized.forEach((word: any) => {
            if(!this.ignore_words.includes(word)) {
                filterd.push(word)
            }
        })
        return filterd
    }

    static stemmer(tokenized: any[]): any[] {
        let filterd: any[] = []
        tokenized.forEach((token: any) => filterd.push(NalapaWord.stem(token)))
        return filterd
    }

    static stopwords(tokenized: any[]): any[] {
        let filterd: any[] = []
        tokenized.forEach((token: any) => {
            if (!Word.isStopword(token)) {
                filterd.push(token)
            }
        })
        return filterd
    }

    static text_correction(tokenized: any[]): any {
        // let data: any[] = fs.readFileSync('./workdir/text_base/id/A.txt').toString().split("\n")
        // data.forEach((line: string) => {
        //     console.log(line.split(" ")[0])
        // })

        let results: any[] = []
        tokenized.forEach((token: string) => {
            console.log(stemmer.stem(token))
            // let correction = autocorrect(token)
            // console.log(correction)

        })
    }
}