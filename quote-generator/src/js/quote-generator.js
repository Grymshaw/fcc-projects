import $ from 'jquery';

export default class QuoteGenerator {
    constructor(jsonUrl = 'https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json') {
        this.jsonUrl = jsonUrl;
        this.data = [];
        //this.quoteData = this.loadAjaxData();
    }

    loadAjaxData(url) {
        let quoteData = this.data;
        //check if it's a JSON url or actual JSON
        if(typeof this.jsonUrl === 'string' && (/\.json$/).test(this.jsonUrl)) {
            return $.ajax({
                type: 'GET',
                url: this.jsonUrl,
                success: function(data) {
                    const json = $.parseJSON(data);
                    for(let i = 0; i < json.length; i++) {
                        quoteData.push({
                            'author': json[i].quoteAuthor,
                            'quote': json[i].quoteText
                        });
                    }
                    console.log(quoteData);
                    console.log(this.data);
                }
            });
        } else if(Array.isArray(this.jsonUrl) && this.jsonUrl.length >= 1 && typeof this.jsonUrl[0] === 'object') {
            //argument is in JSON format
            return this.jsonUrl;
        } else {
            //invalid argument type
            return [];
        }
    }

    setData(data) {
        const json = $.parseJSON(data);
        for(let i = 0; i < json.length; i++) {
            this.data.push({
                'author': json[i].quoteAuthor,
                'quote': json[i].quoteText
            });
        }
        return this.data;
    }

    getQuote(arr, index) {
        console.log('in getQuote()');
        return arr[index];
    }

    getRandomQuote(arr) {
        const index = Math.floor(Math.random() * this.data.length);
        return this.data[index];
    }

    shareTwitter() {
    }

    shareFacebook() {
    }

    render() {

    }
}


//var quoteGenerator = {
//
//    jsonUrl: 'https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json',
//
//    quoteData: [],
//
//    loadAjaxData(json) {
//        //check if it's a JSON url or actual JSON
//        if(typeof json === 'string' && (/\.json$/).test(json)) {
//            const req = new XMLHttpRequest();
//            req.open("GET", json);
//            req.addEventListener('load', function() {
//                const data = JSON.parse(req.responseText);
//                for(let i = 0; i < data.length; i++) {
//                    this.quoteData.push({
//                        'quote': data[i].quoteText,
//                        'author': data[i].quoteAuthor
//                    });
//                }
//            });
//            req.send();
//        } else if(Array.isArray(json) && json.length >= 1 && typeof json[0] === 'object') {
//            //argument is in JSON format
//            this.quoteData = json;
//        } else {
//            //invalid argument type
//            this.quoteData = [];
//        }
//        return this.quoteData;
//    },
//
//    getQuote(index) {
//        return this.quoteData[i];
//    },
//
//    getRandomQuote() {
//        return this.getQuote(Math.floor(Math.random() * this.quoteData.length));
//    },
//
//    shareTwitter() {},
//
//    shareFacebook() {},
//
//    render() {
//    }
//
//};
//
//module.exports = quoteGenerator;
