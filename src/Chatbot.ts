require('dotenv').config()

import { NodeNlp, CorpusObject } from "./interfaces";

import { EntitiesManager, SentimentManager, Filesystem } from "./manager";
import fs from "fs";


const {ConversationContext} = require('node-nlp');
const context = new ConversationContext();
interface ChatbotOptions {
    modelpath: string;
    language: string;
}

interface ChatbotTrainOptions {
    minified: boolean;
    force: boolean;
}


export class Chatbot {
    modelpath: string
    entities: EntitiesManager
    sentiment: SentimentManager
    manager: NodeNlp.NlpManager
    filesystem: Filesystem
    language: string

    constructor(manager: NodeNlp.NlpManager, opts: ChatbotOptions) {
        this.modelpath = opts.modelpath
        this.language = opts.language
        this.manager = manager
        this.entities = new EntitiesManager(this.language, this.manager)
        this.sentiment = new SentimentManager(this.language, this.manager)
        this.filesystem = new Filesystem()
    }

    corpusByFile = (filepath: string) => {
        let file = JSON.parse(fs.readFileSync(filepath).toString())
        let corpus: CorpusObject[] = file
        corpus.forEach(data => {
            if (data.intent !== 'None') {
                data.utterances.forEach(utterance => this.manager.addDocument("id", utterance.toLowerCase(), data.intent));
                data.answers.forEach(answer => this.manager.addAnswer("id", data.intent, answer));
            } else {
                data.answers.forEach(answer => this.manager.addAnswer("id", "None", answer));
            }
        });
    }

    corpusByDir = async (folderpath: string) => {
        let files: string[] = await this.filesystem.getFiles(folderpath)
        files.forEach(file => this.corpusByFile(file))
    }


    train = async (opts: ChatbotTrainOptions) => {
        if (fs.existsSync(this.modelpath) && !opts.force) {
            this.manager.load(this.modelpath)
            return;
        }

        await this.manager.train()
        this.manager.save(this.modelpath)
    }

    process = async (utterance: string) =>  {
        return await this.manager.process(this.language, utterance, context)
    }
}