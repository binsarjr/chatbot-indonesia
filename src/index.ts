import { ENVInterface, NodeNlp } from "./interfaces";

import { Chatbot } from "./Chatbot";


const { ConsoleConnector } = require('@nlpjs/console-connector')

const connector = new ConsoleConnector()

const ENV: ENVInterface = {
	corpus_dir: process.env.PATH_CORPUS_DIR,
	modelpath: process.env.PATH_MODEL
}

let bot = new Chatbot({
	language: "id",
	modelpath: ENV.modelpath
});
(async () => {
	let files: string[]
	// Load entities
	files = await bot.filesystem.getFiles('dataset/entities/tsv')
	files.forEach(file => bot.entities.loadTsv(file))
	files = await bot.filesystem.getFiles('dataset/entities/json')
	files.forEach(file => bot.entities.loadJson(file))

	// Load sentiment
	files = await bot.filesystem.getFiles('dataset/sentiment/tsv')
	files.forEach(file => bot.sentiment.loadTsv(file))
	files = await bot.filesystem.getFiles('dataset/sentiment/json')
	files.forEach(file => bot.sentiment.loadJson(file))



	await bot.corpusByDir(ENV.corpus_dir)
	await bot.manager.train()

	connector.onHear = async (parent: any, line: any) => {
		if (line.toLowerCase() === 'quit') {
			connector.exit();
		} else {
			const result: NodeNlp.process = await bot.process(line.toLowerCase())
			console.log(result)
			if (result.score > 0.75) {
				connector.say(result.answer);
			}
			// console.log(bot.manager.nlp.nluManager.filterNonActivated(result))
		}
	};
	connector.say("Say something...")
})()
