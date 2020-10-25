const { NlpManager, ConversationContext } = require('node-nlp');

const manager = new NlpManager({ languages: ['id'] });
const context = new ConversationContext();

manager.addNamedEntityText(
  'name',
  'john',
  ['id'],
  ["John"],
);

manager.addDocument('id', 'Hello my name is %name%', 'greeting.hello');
manager.addDocument('id', 'I have to go', 'greeting.bye');
manager.addAnswer('id', 'greeting.hello', 'Hey there!');
manager.addAnswer('id', 'greeting.bye', 'Till next time, {{name}}!');

// manager.train()
//   .then((result: any) => manager.process('id', 'Hello my name is John', context))
//   .then((result: any) => manager.process('id', 'I have to go', context))
//   .then((result: any) => console.log(result.answer));
const sentimentId = manager.container.get('sentiment-id')
sentimentId.afinn.bangsat = -2;
manager.train()
  .then((result: any) => manager.process('id', 'kamu bangsat', context))
  .then((result: any) => console.log(result));