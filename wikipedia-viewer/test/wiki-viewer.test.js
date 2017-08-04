import { searchUriBuilder, pageUriBuilder, tocUriBuilder } from '../src/js/wiki-viewer.js';
const should = require('chai').should();

describe('Wiki Viewer', () => {
    describe('#searchUriBuilder()', () => {
        let baseUri, search, limit, result;
        before(() => {
            baseUri = 'http://baseurl.com';
            search = 'foobar';
            limit = 10;
        });
        beforeEach(() => {
            result = searchUriBuilder(search, limit, baseUri);
        });
        it('should return a string', () => {
            result.should.be.a('string');
        });
        it('should contain action=query', () => {
            (/action=query/).test(result).should.equal(true);
        });
        it('should return a string starting with the base uri', () => {
            (new RegExp('^' + baseUri)).test(result).should.equal(true);
        });
        it('should contain &list=search', () => {
            (/&list=search/).test(result).should.equal(true);
        });
        it('should contain srsearch parameter with correct value', () => {
            (new RegExp('&srsearch=' + search)).test(result).should.equal(true);
        });
        it('should replace weird characters with UTF-8 codes', () => {
            search = '\"\<\>\#\{\}\|\\\^\~\[\]\`';
            result = searchUriBuilder(search, limit, baseUri);
            //TODO: ~ character not being recognized...how do you make this work??
            (/[\ \'\"<\>\#\{\}\|\\\^\[\]\`]/g).test(result).should.equal(false);
        });
        it('should encode %', () => {
            search = 'foo%bar';
            result = searchUriBuilder(search, limit, baseUri);
            (/%25/).test(result).should.equal(true);
        });
        it('should contain srlimit parameter with correct value', () => {
            (new RegExp('&srlimit=' + limit)).test(result).should.equal(true);
        });
        it('should contain &format=json', () => {
            (/&format=json/).test(result).should.equal(true);
        });
    });

    describe('#pageUriBuilder()', () => {
        let baseUri, pageTitle, result;
        before(() => {
            baseUri = 'base/url/name/';
            pageTitle = 'randompagetitle';
        });
        beforeEach(() => {
            result = pageUriBuilder(pageTitle, baseUri);
        });
        it('should return a string', () => {
            result.should.be.a('string');
        });
        it('should return string starting with baseUri', () => {
            (new RegExp('^' + baseUri)).test(result).should.equal(true);
        });
        it('should contain action=query', () => {
            (/action=query/).test(result).should.equal(true);
        });
        it('should contain &titles= with correct value', () => {
            (new RegExp('&titles=' + pageTitle)).test(result).should.equal(true);
        });
        it('should contain &prop=extracts%7Cpageimages', () => {
            (/&prop=extracts%7Cpageimages/).test(result).should.equal(true);
        });
        it('should contain &format=json', () => {
            (/&format=json/).test(result).should.equal(true);
        });
        it('should replace weird characters with UTF-8 codes', () => {
            pageTitle= '\"\<\>\#\{\}\|\\\^\~\[\]\`';
            result = pageUriBuilder(pageTitle, baseUri);
            //TODO: ~ character not being recognized...how do you make this work??
            (/[\ \'\"<\>\#\{\}\|\\\^\[\]\`]/g).test(result).should.equal(false);
        });
        it('should encode %', () => {
            pageTitle = 'foo%bar';
            result = pageUriBuilder(pageTitle, baseUri);
            (/%25/).test(result).should.equal(true);
        });
    });

    describe('#tocUriBuilder()', () => {
        let baseUri, page, result;
        before(() => {
            baseUri = 'some/base/uri';
            page = 'testing123';
        });
        beforeEach(() => {
            result = tocUriBuilder(page, baseUri);
        });
        it('should return a string', () => {
            result.should.be.a('string');
        });
        it('should start with baseUri', () => {
            (new RegExp('^' + baseUri)).test(result).should.equal(true);
        });
        it('should contain action=parse', () => {
            (/action=parse/).test(result).should.equal(true);
        });
        it('should contain &page= with specified value', () => {
            (new RegExp('&page=' + page)).test(result).should.equal(true);
        });
        it('should contain &prop=sections', () => {
            (/&prop=sections/).test(result).should.equal(true);
        });
        it('should contain &format=json', () => {
            (/&format=json/).test(result).should.equal(true);
        });
        it('should replace weird character with UTF-8 codes', () => {
            page = '\"\<\>\#\{\}\|\\\^\~\[\]\`';
            result = tocUriBuilder(page, baseUri);
            //result.should.equal('a');
            (/[ '"<>#{}|\^[]`]/g).test(result).should.equal(false);
        });
        it('should encode %', () => {
            page = '%sign';
            result = tocUriBuilder(page, baseUri);
            (/%25/).test(result).should.equal(true);
        });

    });
});
