require('dotenv').config()

import fs from "fs";
import path from "path";
import { Tokenizer } from "./nlp";


interface ENVInterface {
    corpus_dir: string | any;
    modelpath: string | any;
}
const ENV: ENVInterface = {
    corpus_dir: process.env.PATH_CORPUS_DIR,
    modelpath: process.env.PATH_MODEL
}


interface CorpusObject {
    intent: string;
    utterances: any[];
    answers: any[];
}

interface CorpusStructure {
    name ? : string;
    locale: string;
    data: CorpusObject[]
}

/**
 * 
 * @param lang list of countries code
 * @param corpus_dir directory of corpus
 * 
 * @returns :{
  %locale%: {
    name: %name%,
    locale: %locale%,
    data: [
      [Object], ...
    ]
  },
  ...
}

 * 
 * 
 */
export const get_corpus = async (lang: any[] = ['id'], corpus_dir: string = ENV.corpus_dir) =>{
    let result: {
        [index: string]: any
    } = {}
    lang.forEach((country_code: string) => {
        /**
         *  Example: 
         *  {
         *  "name": "Indonesian",
         *  "locale": "id",
         *  "data": [{
         *     "intent": "",
         *     "utterances": [],
         *     "answers": []
         *    }]
         *  }
         */
        let structure_data: CorpusStructure = {
            name: "",
            locale: country_code,
            data: []
        }

        fs.readdirSync(path.join(corpus_dir, country_code)).forEach((filename: string) => {
            let fullpath = path.join(corpus_dir, country_code, filename)
            if (filename == '_name') {
                let name = fs.readFileSync(fullpath).toString().split("\n")[0]
                structure_data.name = name
            } else {
                let data: CorpusObject[] = jsonFileParse(fullpath)
                structure_data.data = [...structure_data.data, ...data]
            }
        })


        result[country_code] = structure_data
    })

    return result
}

export const jsonFileParse = function (fullpath: string) {
    return JSON.parse(fs.readFileSync(fullpath).toString())
}



interface trainOptions {
    modelpath?: string | any;
    minified?: boolean;
    lang?: any[];
    force?: boolean;
}
export const train = async (NLPmanager: any, options: trainOptions = {
    modelpath: ENV.modelpath,
    minified: true,
    lang: ['id'],
    force: false
}) => {
    let {
        modelpath, minified, lang, force
    } = options

    if (fs.existsSync(modelpath) && !force) {
        NLPmanager.load(modelpath)
        return;
    }


    // Named Entity
    NLPmanager.addRegexEntity('email',['id'], /\b(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})\b/gi);

    
    // Corpus
    let countries_data = await get_corpus()
    for (let locale in countries_data) {
        let corpus: CorpusStructure = countries_data[locale]
        corpus.data.forEach((data: any) => {
            if (data.intent !== 'None') {
                data.utterances.forEach((utterance: string) => {
                    NLPmanager.addDocument(corpus.locale, utterance.toLowerCase(), data.intent);
                });
                data.answers.forEach((answer: any) => {
                    NLPmanager.addAnswer(corpus.locale, data.intent, answer);
                });
            } else {
                data.answers.forEach((answer: any) => {
                    NLPmanager.addAnswer(corpus.locale, "None", answer);
                });
            }
        });
    }

    // say('Training, please wait..');
    const hrstart = process.hrtime();
    await NLPmanager.train();
    const hrend = process.hrtime(hrstart);
    console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    // say('Trained!');

    NLPmanager.save(modelpath, minified)

}


export const addQnA = async (question: string, answer: string,NLPmanager: any, options = {
    delimiter: '|',
    lang: 'id',
    filename: 'qna.json',
}) => {
    let { delimiter, lang,filename } = options
    let realpath = path.join(ENV.corpus_dir,lang,filename)

    let utterances: any[] = []
    question.toLowerCase().split(delimiter).forEach((question: string) => {
        utterances.push(Tokenizer.filter_punctuation(Tokenizer.word_tokenizer(question)).join(' '))
    })
    let answers: any[] = []
    answer.split(delimiter).forEach((answer: string) => {
        answers.push(answer)
    })

    let intent = 'qna.' + Tokenizer.stemmer(Tokenizer.filter_punctuation(Tokenizer.word_tokenizer(utterances[0]))).join('.')

    let corpus: CorpusObject = {intent,utterances, answers}
    
    if(!fs.existsSync(realpath)) {
        fs.writeFileSync(realpath,JSON.stringify([]))
    } else {
        let dataCorpus: CorpusObject[]=[]
        try {
            dataCorpus = JSON.parse(fs.readFileSync(realpath).toString())
        } catch (error) {
            fs.writeFileSync(realpath,JSON.stringify([]))
            dataCorpus = JSON.parse(fs.readFileSync(realpath).toString())
        }
        let result = await NLPmanager.process(intent.split('.').join(' '))
        if(result.intent !== 'None') {
            corpus.intent = result.intent
        }

        let hasSimilarity=false
        if(dataCorpus.length > 0) {
            for(let i in dataCorpus) {
                if(dataCorpus[i].intent == corpus.intent) {
                    dataCorpus[i].utterances = [...dataCorpus[i].utterances,...utterances]
                    dataCorpus[i].utterances = Array.from(new Set(dataCorpus[i].utterances))

                    dataCorpus[i].answers = [...dataCorpus[i].answers,...answers]
                    dataCorpus[i].answers = Array.from(new Set(dataCorpus[i].answers))
    
                    hasSimilarity=true
                }
                if(!hasSimilarity && (parseInt(i)+1) == dataCorpus.length) {
                    dataCorpus.push(corpus)
                }
            }
        } else {
            dataCorpus.push(corpus)
        }
        await train(NLPmanager,{force: true})
        
        fs.writeFileSync(realpath,JSON.stringify(dataCorpus))
    }

}