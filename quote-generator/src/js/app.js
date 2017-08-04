import 'normalize.css';
import 'font-awesome-webpack';
import '../styles/main.scss';
import QuoteGenerator from  './quote-generator.js';

document.addEventListener("DOMContentLoaded", function() {

    //instantiate quote generator
    const generator = new QuoteGenerator();
    const quotes = generator.loadAjaxData((value) => {
        generator.setData(value.responseText);
        renderNewQuote();
    });

    //cache DOM
    const quoteText = document.querySelector('.quote__text');
    const quoteCitation = document.querySelector('.quote__citation');
    //const likeButton = document.querySelector('.vote-button--like');
    //const dislikeButton = document.querySelector('.vote-button--dislike');
    const twitterShareButton = document.querySelector('.js-twitter-share');
    //const facebookShareButton = document.querySelector('.js-facebook-share');
    const getQuoteButton = document.querySelector('.js-get-quote-button');

    //bind events
    getQuoteButton.addEventListener('click', renderNewQuote);

    function renderNewQuote() {
        const newQuote = generator.getRandomQuote(quotes);
        quoteCitation.innerHTML = newQuote.author;
        quoteText.innerHTML = newQuote.quote;
        quoteText.appendChild(quoteCitation);
        let uri = '"' + newQuote.quote + '" ' + newQuote.author;
        twitterShareButton.href = "http://twitter.com/intent/tweet?text=" +
            encodeURI(uri);
    }



});
