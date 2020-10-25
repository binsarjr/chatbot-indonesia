require('dotenv').config()

import fs from "fs";
import { ENVInterface } from "./interfaces/ChatbotInterface";

const ENV: ENVInterface = {
    corpus_dir: process.env.PATH_CORPUS_DIR,
    modelpath: process.env.PATH_MODEL
}

class Chatbot {
    path_model: string;
    constructor() {
        this.path_model = ENV.modelpath
    }
    async train() {
        
    }
}