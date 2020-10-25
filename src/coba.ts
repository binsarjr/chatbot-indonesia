import { SentimentManager, EntitiesManager } from "./manager";


const { NlpManager, ConversationContext } = require('node-nlp');

const manager = new NlpManager({ languages: ['id'] });
const context = new ConversationContext();
const entities = new EntitiesManager(manager);
const sentimentManager = new SentimentManager(manager)


entities.loadCsv('id', 'dataset/entities/example.csv')
entities.loadJson('id', 'dataset/entities/example.json')

sentimentManager.loadCsv('id', 'dataset/sentiment/example.csv')
sentimentManager.loadJson('id', 'dataset/sentiment/example.json')

manager.addDocument('id', 'Hello my name is %name%', 'greeting.hello');
manager.addDocument('id', 'I have to go', 'greeting.bye');
manager.addAnswer('id', 'greeting.hello', 'Hey there!');
manager.addAnswer('id', 'greeting.bye', 'Till next time, {{name}}!');


manager.train()
  // .then((result: any) => manager.process('id', 'Hello my name is John', context))
  .then(() => manager.process('id', 'Hello my name is Sinta', context))
  .then(() => manager.process('id', 'I have to go', context))
  .then((result: any) => console.log(result.answer));
