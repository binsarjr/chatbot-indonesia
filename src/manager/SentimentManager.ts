// Interfaces
import { NodeNlp } from "../interfaces";

// set local interfaces
type NlpManager = NodeNlp.NlpManager
interface SentimentJson {
  word: string;
  point: number;
}

// Library
import fs from "fs";

export class SentimentManager {
  manager: NlpManager
  constructor(manager: NlpManager) {
    this.manager = manager
  }

  loadCsv = (language: string, filepath: string) => {
    let lines = fs.readFileSync(filepath).toString().split("\n")
    for (let line of lines) {
      let data = line.split("\t")
      let word = data[0]
      let point = parseInt(data[1])
      this.add(language, word, point)
    }
  }

  loadJson = (language: string, filepath: string) => {
    let sentiments: SentimentJson[] = JSON.parse(fs.readFileSync(filepath).toString())
    for (let sentiment of sentiments) {
      this.add(language, sentiment.word, sentiment.point)
    }
  }

  add = (language: string, word: string, point: number) => {
    word = word.toLowerCase()
    let sentiment = this.manager.container.get(`sentiment-${language}`)

    sentiment.afinn[word] = point
  }

  remove = (language: string, word: string) => {
    word = word.toLowerCase()
    let sentiment = this.manager.container.get(`sentiment-${language}`)

    if (word in sentiment.afinn) {
      delete sentiment.afinn[word]
    }
  }
}