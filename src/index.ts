import { ENVInterface } from "./interfaces";

import { Chatbot } from "./Chatbot";

const { NlpManager } = require('node-nlp');
const { ConsoleConnector } = require('@nlpjs/console-connector')


let locale: string = "id";
const manager = new NlpManager({
    languages: [locale],
    forceNER: true,
    nlu: { log: false }
});
const connector = new ConsoleConnector()

const ENV: ENVInterface = {
    corpus_dir: process.env.PATH_CORPUS_DIR,
    modelpath: process.env.PATH_MODEL
}

let bot = new Chatbot(manager, {
    language: 'id',
    modelpath: ENV.modelpath
});
(async () => {
    let files: string[]
    // Load entities
    files = await bot.filesystem.getFiles('dataset/entities/csv')
    files.forEach(file => bot.entities.loadCsv(file))
    files = await bot.filesystem.getFiles('dataset/entities/json')
    files.forEach(file => bot.entities.loadJson(file))

    // Load sentiment
    files = await bot.filesystem.getFiles('dataset/sentiment/csv')
    files.forEach(file => bot.sentiment.loadCsv(file))
    files = await bot.filesystem.getFiles('dataset/sentiment/json')
    files.forEach(file => bot.sentiment.loadJson(file))



    await bot.corpusByDir(ENV.corpus_dir)
    await bot.manager.train()


    connector.onHear = async (parent: any, line: any) => {
        if (line.toLowerCase() === 'quit') {
            connector.destroy();
            process.exit();
        } else {
            const result = await bot.process(line.toLowerCase())
            connector.say(result.answer);
        }
    };
    connector.say("Say something...")
})()
