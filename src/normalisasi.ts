import fs from "fs";
import { Tokenizer,Cleaner } from "./nlp";

const stopword = require('stopword')


let sentiments: {[i: string]: any} = {
    negatif: [],
    positif: []
}


// negatif.txt
let negatif: any[] = fs.readFileSync('dataset/sentiment/negatif.txt').toString().split("\n")
negatif = Array.from(new Set(negatif))
negatif.sort()


// positif
let positif: any[] = fs.readFileSync('dataset/sentiment/positif.txt').toString().split("\n")
positif = Array.from(new Set(positif))
positif.sort()

// negatif = sentiments.negatif.map((data: any) => `${data.text}\t${data.point}`)
// positif = sentiments.positif.map((data: any) => `${data.text}\t${data.point}`)


fs.writeFileSync('dataset/sentiment/negatif.txt',negatif.join("\n"))
fs.writeFileSync('dataset/sentiment/positif.txt',positif.join("\n"))