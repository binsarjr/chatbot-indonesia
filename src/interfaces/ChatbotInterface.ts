export interface ENVInterface {
	corpus_dir: string | any;
	modelpath: string | any;
}


export interface CorpusObject {
	intent: string;
	utterances: any[];
	answers: any[];
}