// Interfaces
import { NodeNlp } from "../interfaces";

// set local interfaces
type NlpManager = NodeNlp.NlpManager
interface EntityJson {
  entityName: string;
  optionName: string;
  texts: string[];
}

// Library
import fs from "fs";

export class EntitiesManager {
  manager: NlpManager
  constructor(manager: NlpManager) {
    this.manager = manager
  }

  loadCsv = (languages: string[], filepath: string) => {
    let lines = fs.readFileSync(filepath).toString().split("\n")
    for (let line of lines) {
      let data = line.split("\t")
      let entityName = data[0]
      let optionName = data[1]
      let texts = data[2].split(',')
      this.add(entityName, optionName, languages, texts)
    }
  }

  loadJson = (languages: string[], filepath: string) => {
    let entities: EntityJson[] = JSON.parse(fs.readFileSync(filepath).toString())
    for (let entity of entities) {
      this.add(entity.entityName, entity.optionName, languages, entity.texts)
    }
  }

  add = (entityName: string, optionName: string, languages: string[], texts: string[]) => {
    this.manager.addNamedEntityText(entityName, optionName, languages, texts)
  }

  addRegex = (entityName: string, languages: string[], regex: RegExp) => {
    this.manager.addRegexEntity(entityName, languages, regex)
  }

  remove = (entityName: string, optionName: string, languages: string[], texts: string[]) => {
    this.manager.removeNamedEntityText(entityName, optionName, languages, texts)
  }
}