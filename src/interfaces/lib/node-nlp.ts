interface nluAnswer {
	classifications: any[];
	entities: any;
	explanation: any;
}
interface classifications {
	intent: string;
	score: number;
}
interface resolution {
	strValue: string;
	value: number;
	subtype: string;
}
interface sourceEntities {
	start: number;
	end: number;
	resolution: resolution[];
	text: string;
	typeName: string;
}
interface entities {
	start: number;
	end: number;
	len: number;
	levenshtein: number;
	accuracy: number;
	entity: string;
	resolution: resolution;
	type: string;
	option: string;
	sourceText: string;
	utteranceText: string;
}
interface answers {
	answer: string;
	opts: any;
}
interface sentiment {
	score: number;
	numWords: number;
	numHits: number;
	average: number;
	type: any;
	locale: string;
	vote: string;
}
export interface process {
	locale: string;
	utterance: string;
	languageGuessed: boolean;
	localeIso2: string;
	language: string;
	nluAnswer: nluAnswer;
	classifications: classifications[];
	intent: string;
	score: number;
	domain: string;
	optionalUtterance: string;
	sourceEntities: sourceEntities[];
	entities: entities[];
	answers: answers[];
	answer: string | undefined;
	actions: any[];
	sentiment: sentiment
}

export interface NlpManager {
	addDocument(locale: string, utterance: string, intent: string): any;
	removeDocument(locale: string, utterance: string, intent: string): any;
	addLanguage(locale: string): any;
	removeLanguage(locale: string): any;
	assignDomain(locale: string, intent: string, domain: string): any;
	getIntentDomain(locale: string, intent: string): any;
	getDomains(): any;
	guessLanguage(text: string): any;
	addAction(intent: string, action: any, parameters: any, fn ? : any): any;
	getActions(intent: string): any;
	removeAction(intent: string, action: any, parameters: any): any;
	removeActions(intent: string): any;
	addAnswer(locale: string, intent: string, answer: string, opts ? : any): any;
	removeAnswer(locale: string, intent: string, answer: string, opts ? : any): any;
	findAllAnswers(locale: string, intent: string): any;
	getSentiment(locale: string, utterance: string): any;
	addNamedEntityText(entityName: string, optionName: string, languages: string[], texts: string[]): any;
	removeNamedEntityText(entityName: string, optionName: string, languages: string[], texts: string[]): any;
	addRegexEntity(entityName: string, languages: string[], regex: RegExp): any;
	addBetweenCondition(locale: string, name: string, left: any, right: any, opts: any): any;
	addPositionCondition(locale: string, name: string, position: any, words: string[], opts: any): any;
	addAfterCondition(locale: string, name: string, words: string[], opts: any): any;
	addAfterFirstCondition(locale: string, name: string, words: string[], opts: any): any;
	addAfterLastCondition(locale: string, name: string, words: string[], opts: any): any;
	addBeforeCondition(locale: string, name: string, words: string[], opts: any): any;
	addBeforeFirstCondition(locale: string, name: string, words: string[], opts: any): any;
	addBeforeLastCondition(locale: string, name: string, words: string[], opts: any): any;
	describeLanguage(locale: string, name: string): any;
	train(): any;
	process: Function;
	extractEntities(locale: string, utterance: string, context: any, settings: any): any;
	toObj(): any;
	fromObj(obj: any): any;
	export (minified ? : boolean): any;
	import(data: any): any;
	save(srcFileName: string, minified ? : boolean): any;
	load(srcFileName: string): any;
	loadExcel(fileName ? : string): any;

	container: any;
}


export interface corpusObj {
	intent: string;
	utterances: string[];
	answers: string[];
}