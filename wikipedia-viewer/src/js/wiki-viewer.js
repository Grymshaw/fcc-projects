import $ from 'jquery';
const baseUrl = 'https://en.wikipedia.org/w/api.php?';

function getWikiArticles(searchTerms, limit) {
    return new Promise((resolve, reject) => {
        // let uri = searchUriBuilder(searchTerms, limit, baseUrl) + '&callback=?';
        $.ajax({
            url: uri,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false
            // headers: {
            //     'Api-User-Agent': 'localhost:8080',
            // }
        });
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', uri, true);
        // xhr.setRequestHeader('Access-Control-Allow-Origin', baseUrl);
        // xhr.setRequestHeader('Api-User-Agent', 'localhost:8080');
        // xhr.send();

        // xhr.onload = () => {
        //     resolve(xhr);
        // };
        // xhr.onerror = () => {
        //     reject(new Error('Error loading articles'));
        // };
    });
}
function searchUriBuilder(search, limit, base) {
    let queryUri = base;// + "action=&search=" + search + "&format=json";
    queryUri += 'action=query';
    queryUri += '&list=search';
    queryUri += `&srsearch=${encodeURIComponent(search)}&srlimit=${limit}&format=json`;
    return queryUri;
}
function pageUriBuilder(page, base) {
    let queryUri = base;
    queryUri += 'action=query';
    queryUri += `&titles=${encodeURIComponent(page)}`;
    queryUri += '&prop=extracts%7Cpageimages&format=json';
    return queryUri;
}
function tocUriBuilder(page, base) {
    let queryUri = `${base}action=parse`;
    queryUri += `&page=${encodeURI(page)}`;
    queryUri += '&prop=sections&format=json';
    return queryUri;
}

module.exports = { searchUriBuilder, pageUriBuilder, tocUriBuilder, getWikiArticles };
