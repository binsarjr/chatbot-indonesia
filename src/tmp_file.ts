const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangId } = require('@nlpjs/lang-id');

(async () => {
  const container = new Container();
  container.use(LangId);
  const sentimentId = container.get('sentiment-id');
  sentimentId.afinn.love = 10;
  sentimentId.afinn.bangsat = -5;
const sentiment = new SentimentAnalyzer({ container });
const result = await sentiment.process({
    locale: 'id',
    text: 'Kamu bangsat',
});
console.log(result.sentiment);
})();