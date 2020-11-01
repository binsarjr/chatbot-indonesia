// Interfaces
import { NodeNlp } from "../interfaces";

// set local interfaces
type NlpManager = NodeNlp.NlpManager
interface SentimentJson {
	word: string;
	point: number;
}

// Library
import { readFile } from "../transform-callback/fs";

export class SentimentManager {
	manager: NlpManager
	language: string;
	constructor(language: string, manager: NlpManager) {
		this.manager = manager
		this.language = language
	}

	loadCsv = async (filepath: string) => {
		let lines = (await readFile(filepath)).toString().split("\n")
		for (let line of lines) {
			let data = line.split("\t")
			let word = data[0]
			let point = parseInt(data[1])
			this.add(word, point)
		}
	}

	loadJson = async (filepath: string) => {
		let data = await readFile(filepath)
		let sentiments: SentimentJson[] = JSON.parse(data.toString())
		for (let sentiment of sentiments) {
			this.add(sentiment.word, sentiment.point)
		}
	}

	add = (word: string, point: number) => {
		word = word.toLowerCase()
		let sentiment = this.manager.container.get(`sentiment-${this.language}`)

		sentiment.afinn[word] = point
	}

	remove = (word: string) => {
		word = word.toLowerCase()
		let sentiment = this.manager.container.get(`sentiment-${this.language}`)

		if (word in sentiment.afinn) {
			delete sentiment.afinn[word]
		}
	}
}