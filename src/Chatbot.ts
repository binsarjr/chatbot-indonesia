require('dotenv').config()

import fs from "fs";
import { ENVInterface } from "./ChatbotInterface";

const ENV: ENVInterface = {
    corpus_dir: process.env.PATH_CORPUS_DIR,
    modelpath: process.env.PATH_MODEL
}

class Chatbot {
    path_model: string;
    constructor() {
        this.path_model = ENV.modelpath
    }
    async train() {
        
    }
}


// Normalisasi data
let negativePath = './dataset/sentiment/negatif.txt'
let negative = fs.readFileSync(negativePath).toString().split('\n')
negative = Array.from(new Set(negative))
negative = negative.filter((el: string) => el != null && el != '')
negative = negative.map((data: string) => `${data.split("\t")[0]}\t-1`)
fs.writeFileSync(negativePath,negative.join("\n"))


let positivePath = './dataset/sentiment/positif.txt'
let positive = fs.readFileSync(positivePath).toString().split('\n')
positive = Array.from(new Set(positive))
positive = positive.filter((el: string) => el != null && el != '')
positive = positive.map((data: string) => `${data.split("\t")[0]}\t1`)
fs.writeFileSync(positivePath,positive.join("\n"))