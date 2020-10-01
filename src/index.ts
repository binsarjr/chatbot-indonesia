import { train, addQnA } from "./nlp_utils";

const {
    NlpManager
} = require('node-nlp');

const {
    ConsoleConnector
} = require('@nlpjs/console-connector')

const manager = new NlpManager({
    languages: ['id'],
    forceNER: true,
});


(async () => {
    await addQnA("Mengapa HTML tidak dianggap sebagai bahasa pemrograman?|Kenapa HTML Bukanlah Bahasa Pemrograman|kenapa html bukan bahasa pemograman|apakah html itu bahasa pemograman?","HTML merupakan akronim dari Hypertext Markup Language. Dari namanya saja sudah kelihatan kalau HTML itu bahasa markup, bukan bahasa pemrograman. HTML itu diibaratkan sebagai “wadah” bagi bahasa pemrograman web, seperti PHP, Javascript.|Ada banyak kriteria yang menentukan sebuah bahasa adalah bahasa pemrograman. Kriteria yang paling mendasar adalah apakah bahasa tersebut Turing-Complete, atau dengan kata lain, bisa menjalankan Turing Machine. Sebuah bahasa yang Turing-Complete adalah bahasa yang cukup powerful untuk menjalankan semua komputasi yang ada di dunia. Sedangkan HTML tidak memenuhi kriteria ini",manager)
})();

const connector = new ConsoleConnector()
connector.onHear = async (parent: any, line: any) => {
    if (line.toLowerCase() === 'quit') {
        connector.destroy();
        process.exit();
    } else {
        const result = await manager.process(line.toLowerCase());
        console.log(result)
        connector.say(result.answer);
    }
};

(async () => {
    await train(manager);
    connector.say('Say something!');
})();