const Nalapa = require('nalapa')
const NalapaWord = Nalapa.word

export class Word {
    static isStopword (word: string): boolean {
        return NalapaWord.isStopword(word)
    }
    static isBasicWord (word: string): boolean {
        return NalapaWord.isBasicWord(word)
    }
    static isAdjective (word: string): boolean {
        return NalapaWord.isAdjective(word)
    }
    static isAdverb (word: string): boolean {
        return NalapaWord.isAdverb(word)
    }
    static isNum (word: string): boolean {
        return NalapaWord.isNum(word)
    }
    static isPre (word: string): boolean {
        return NalapaWord.isPre(word)
    }
    static isPron (word: string): boolean {
        return NalapaWord.isPron(word)
    }
    static isVerb (word: string): boolean {
        return NalapaWord.isVerb(word)
    }
    static stem (word: string): string {
        return NalapaWord.stem(word)
    }
    static stemPrefix (word: string): string {
        return NalapaWord.stemPrefix(word)
    }
    static stemSuffix (word: string): string {
        return NalapaWord.stemSuffix(word)
    }
    static stemConfix (word: string): string {
        return NalapaWord.stemConfix(word)
    }
}