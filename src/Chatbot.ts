require('dotenv').config()

import { NodeNlp, CorpusObject, NlpUtils } from "./interfaces";

import { EntitiesManager, SentimentManager, Filesystem } from "./manager";
import fs from "fs";


const { NlpManager, ConversationContext } = require('node-nlp');
const NlpUtils: NlpUtils = require('@nlpjs/utils');

interface ChatbotOptions {
	modelpath: string;
	language: string;
}



const context = new ConversationContext();
export class Chatbot {
	modelpath: string
	entities: EntitiesManager
	sentiment: SentimentManager
	manager: NodeNlp.NlpManager
	filesystem: Filesystem
	language: string

	constructor(opts: ChatbotOptions) {
		this.modelpath = opts.modelpath
		this.language = opts.language
		this.manager = new NlpManager({
			languages: [this.language],
			forceNER: true,
			spellCheck: true,
			modelFileName: this.modelpath,
			nlu: {
				log: false,
				spellCheck: true,
				useNoneFeature: true,
				trainByDomain: false
			},
			ner: {
				threshold: 1
			}
		});
		this.entities = new EntitiesManager(this.language, this.manager)
		this.sentiment = new SentimentManager(this.language, this.manager)
		this.filesystem = new Filesystem()
	}


	corpusByFile = (filepath: string) => {
		let file = JSON.parse(fs.readFileSync(filepath).toString())
		let corpus: CorpusObject[] = file
		corpus.forEach(data => {
			if (data.intent !== 'None') {
				data.utterances.forEach(composeUtterance => NlpUtils.composeFromPattern(composeUtterance).forEach(utterance => this.manager.addDocument(this.language, utterance, data.intent)));
				data.answers.forEach(answer => this.manager.addAnswer(this.language, data.intent, answer));
			} else {
				data.answers.forEach(answer => this.manager.addAnswer(this.language, "None", answer));
			}
		});
	}

	corpusByDir = async (folderpath: string) => {
		let files: string[] = await this.filesystem.getFiles(folderpath)
		files.forEach(file => this.corpusByFile(file))
	}


	process = async (utterance: string) => {
		return await this.manager.process(this.language, utterance, context)
	}
}