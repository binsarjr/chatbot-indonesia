import { Filesystem } from "./Filesystem";


class Sentiment {
  sentimentDir: string;
  negative: any[] = [];
  constructor(sentimentDir: string) {
    this.sentimentDir = sentimentDir;
  }
  load = async () => {
    let files = new Filesystem().getFiles(this.sentimentDir, false);
    return files;
  }
}

; (async () => {
  let sentiment = new Sentiment('dataset/sentiment/');
  let files = await sentiment.load();
  console.log(files);
})()