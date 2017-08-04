import "normalize.css";
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import "../styles/main.scss";
import $ from 'jquery';

$(document).ready(() => {
    //initialize search value;
    let search = '';
    const timeouts = [];

    //cache dom
    let $searchInput = $('.search__input'),
        $searchButton = $('.search__icon'),
        $searchLabel = $('.search-input__label'),
        $inputGroup = $('.input-group'),
        $articlesContainer = $('.articles-container');

    //bind events
    $searchInput.on('keypress', (e) => {
        for(let i = 0; i < timeouts.length; i++) {
            window.clearTimeout(timeouts[i]);
        }
        if(document.getElementsByClassName('loading-icon').length === 0) {
            $articlesContainer.html('<i class="fa fa-refresh fa-spin fa-3x loading-icon"></i>');
            $articlesContainer.addClass('isLoading');
        }
        timeouts.push(setTimeout(function() {
                $searchInput.trigger('searchSubmit');
                console.log('event handler finished');
            }, 600)
        );
    });
    $searchButton.on('click', (e) => {
        if($searchInput.val() !== '') {
            $searchInput.trigger('searchSubmit');
        }
    });
    $searchInput.on('searchSubmit', (event) => {
        let search = $searchInput.val();
        if(search !== '') {
            wikiRequest(search).then((data) => {
                const formattedData = handleResponse(data);
                if(formattedData.length !== 0) {
                    let html = formatHTML(formattedData);
                    $articlesContainer.html(html);
                } else {
                    $articlesContainer.html('<p style="color: lightgrey; text-align: center;">No result matches</p>');
                }
                $articlesContainer.removeClass('isLoading');
            });
        } else {
            $articlesContainer.html('');
            $articlesContainer.removeClass('isLoading');
        }
    });


    function wikiRequest(search) {
        return $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?' + `action=opensearch&search=${encodeURI(search)}&format=json&callback=?`,
            type: 'GET',
            dataType: 'jsonp',
        });
    }

    function formatHTML(data) {
        return data.reduce((html, cur) => {
            return html + `<div class='article'>
            <h3 class='article__title'><a class='article__link' target='_blank' href='${cur.link}'>${cur.title}</a></h3>
            <p class='article__description'>${cur.description}</p>
            </div>`;
        }, '');
    }

    function handleResponse(data) {
        const newData = data[1].map((value) => {
            return {
                title: value,
                description: data[2][data[1].indexOf(value)],
                link: data[3][data[1].indexOf(value)]
            };
        });
        return newData;
    }
});
