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
import { readFile } from "../transform-callback/fs";

type SeparatedValuesDelimiter = "," | "\t"

export class EntitiesManager {
	manager: NlpManager
	language: string
	constructor(language: string, manager: NlpManager) {
		this.manager = manager
		this.language = language
	}

	loadSeparatedValues = async (filepath: string, delimiter: SeparatedValuesDelimiter) => {
		let lines: string[] = (await readFile(filepath)).toString().split("\n")
		for (let line of lines) {
			let data = line.split(delimiter)
			let entityName = data[0]
			let optionName = data[1]
			let texts = data[2].split('|')
			this.add(entityName, optionName, texts)
		}
	}

	loadCsv = async (filepath: string) => this.loadSeparatedValues(filepath, ",")
	loadTsv = async (filepath: string) => this.loadSeparatedValues(filepath, "\t")

	loadJson = async (filepath: string) => {
		let data = await readFile(filepath)
		let entities: EntityJson[] = JSON.parse(data.toString())
		for (let entity of entities) {
			this.add(entity.entityName, entity.optionName, entity.texts)
		}
	}

	add = (entityName: string, optionName: string, texts: string[]) => {
		this.manager.addNamedEntityText(entityName, optionName, [this.language], texts)
	}

	addRegex = (entityName: string, regex: RegExp) => {
		this.manager.addRegexEntity(entityName, [this.language], regex)
	}

	remove = (entityName: string, optionName: string, texts: string[]) => {
		this.manager.removeNamedEntityText(entityName, optionName, [this.language], texts)
	}
}