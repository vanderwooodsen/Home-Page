const axios = require('axios');
const router = require('express').Router()
const qs = require('qs');
const createClient = require('pexels').createClient;
const _ = require('lodash');
const htmlEntities = require('html-entities');

const pexelsClient = createClient(process.env.PEXELS_CLIENT_SECRET);



router.get('/', async (req, res, next) => {
  try{
    let data = qs.stringify({
      method: 'getQuote',
      format: 'json',
      lang: 'en'
    })

    console.log('data:', data);

    let quoteResult = await axios.post('http://api.forismatic.com/api/1.0/', data);
    let quote = quoteResult.data;

    let triviaResult = await axios.get('https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple');
    let trivia = triviaResult.data.results[0];
    trivia = formatTrivia(trivia);

    let pexels = await pexelsClient.photos.search({
      color: 'black',
      query: 'Nature',
      per_page: 80,
      orientation: 'landscape'
    });


    const lastPhoto = pexels.photos.length - 1;
    const randomPhoto = Math.floor(Math.random() * lastPhoto);

    let photo = pexels.photos[randomPhoto].src.original;


    console.log(quoteResult.data);
    console.log('correct answer: ', trivia.correct_answer)
    res.send({
      quote: {
        text: quote.quoteText,
        author:quote.quoteAuthor
      },
      background: {
        url: photo
      },
      trivia: trivia,
    })
  }catch(err){
    console.log('We have eeror', err);
    res.send(err.message)
  }
})

function formatTrivia(trivia) {
  let allAnswers = [...trivia.incorrect_answers, trivia.correct_answer];
  let answers = _.shuffle(allAnswers)
  return {
    question: htmlEntities.decode(trivia.question),
    answers: answers.map(htmlEntities.decode),
    correct_answer: htmlEntities.decode(trivia.correct_answer),
  };
}

module.exports = router;
