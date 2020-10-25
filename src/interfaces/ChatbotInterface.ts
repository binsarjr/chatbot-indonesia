export interface ENVInterface {
    corpus_dir: string | any;
    modelpath: string | any;
}


export interface CorpusObject {
    intent: string;
    utterances: any[];
    answers: any[];
}

export interface CorpusStructure {
    name ? : string;
    locale: string;
    data: CorpusObject[]
}