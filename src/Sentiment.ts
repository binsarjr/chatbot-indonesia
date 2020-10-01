import fs from "fs";
import csv from "csv-parser";
import path from "path";

const sentiment = new (require('sentiment'))



type lang = 'all' | 'en' | 'id'
const langSupported = ['en','id']

interface SentimentStructure {
    score: string,
    text: string
}

interface SentimentJson {
    [index: string]: SentimentStructure[]
}

class Sentiment {
    public sentiment_dir: string = path.join(__dirname,'../dataset/sentiments/json')
    public data: SentimentJson={}
    public constructor(language: lang = 'all') {
        if(language == 'all') {
            langSupported.forEach((l: any) => {
                let lang: lang = l
                this.data[lang] = this.parse(lang)
            })
        } else {
            this.data[language]=this.parse(language)
        }

        for(let lang in this.data) {
            
            let analysis = {
                labels: {}
            };
            this.data[lang].forEach(sentiment => {
                analysis['labels'] = {
                    ...analysis['labels'],
                    [`${sentiment.text}`]: parseFloat(sentiment.score)
                }
            })
            sentiment.registerLanguage(lang, analysis);
        }
    }

    public parse(language: lang){
        try {
            let fs_data:any = fs.readFileSync(path.join(this.sentiment_dir,`${language}.json`))
            let data = JSON.parse(fs_data.toString())
            return data
        } catch (error) {
            return []
        }
    }

    public analyze(sentence: string, options?: object) {
        return sentiment.analyze(sentence, options)
    }
}

let sent = new Sentiment()
console.log(sent.analyze('Jangan sedih hidup masih panjang ',{language: 'id'}))