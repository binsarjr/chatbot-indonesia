const Nalapa = require('nalapa')
const NalapaTokenizer = Nalapa.tokenizer
const NalapaWord = Nalapa.word


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

}