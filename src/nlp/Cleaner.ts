const Nalapa = require('nalapa').cleaner

export class Cleaner {
    static isASCII(word: string): boolean {
        return Nalapa.isASCII(word)
    }
    static isAlphaNumeric(word: string): boolean {
        return Nalapa.isAlphaNumeric(word)
    }
    static removeNonASCII(word: string): string {
        return Nalapa.removeNonASCII(word)
    }
    static removeNonAlphaNumeric(word: string): string {
        return Nalapa.removeNonAlphaNumeric(word)
    }
    static removeHTMLTags(word: string): string {
        return Nalapa.removeHTMLTags(word)
    }
}