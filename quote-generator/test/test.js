import assert from 'assert';
import { expect } from 'chai';
import QuoteGenerator from '../src/js/quote-generator';

describe('Quote Generator', function() {
    describe('#loadAjaxData(jsonPath)', function() {
        describe('when passed JSON as an argument', function() {
            let input,
                result,
                quoteGenerator;
            beforeEach(function() {
                input = [
                    { 'quote': 'How do you do?', 'author': 'Stewie' },
                    { 'quote': 'What do you say?', 'author': 'Jonathan' },
                    { 'quote': 'Get off my plane', 'author': 'Harrison Ford' }
                ];
                quoteGenerator = new QuoteGenerator(input);
                result = quoteGenerator.loadAjaxData();
            });
            it('should return the data as an array of objects', function() {
                expect(input.length).to.be.above(1);
                expect(result).to.be.an('array');
                expect(result[0]).to.be.an('object');
            });
            it('should give each item a quote and an author', function() {
                expect(result[0].quote).to.equal('How do you do?');
                expect(result[0].author).to.equal('Stewie');
            });
            it('should get all entries from the supplied path', function() {
                expect(result.length).to.equal(3);
            });
            it('should return an empty array if the path is not valid', function() {
                input = [];
                quoteGenerator = new QuoteGenerator(input);
                result = quoteGenerator.loadAjaxData();
                expect(Array.isArray(result)).to.equal(true);
                expect(result.length).to.equal(0);
            });
        });
        describe('when passed a url string', function() {
            let result,
                quoteGenerator;

            beforeEach(function() {
                quoteGenerator = new QuoteGenerator();
                result = quoteGenerator.loadAjaxData().then((value) => {
                    generator.setData(value.responseText);
                });
            });
            it('should return the data as an array of objects', function() {
                expect(result).to.be.an('array');
                expect(result.length).to.be.above(0);
                expect(result[0]).to.be.an('object');
            });
            it('should give each item a quote and an author', function() {
                expect(result[0].quote).to.equal('Life isn’t about getting and having, it’s about giving and being.');
                expect(result[0].author).to.equal('Kevin Kruse');
            });
            it('should get all entries from the supplied path', function() {
                expect(result.length).to.equal(5421);
            });
            it('should return an empty array if the path is not valid', function() {
                result = quoteGenerator.loadAjaxData('');
                expect(Array.isArray(result)).to.equal(true);
                expect(result.length).to.equal(0);
            });

        });
    });

    describe('#getQuote(index)', function() {
    });

    describe('#getRandomQuote()', function() {
    });

    describe('#shareTwitter()', function() {
    });

    describe('#shareFacebook()', function() {
    });

    describe('#render()', function() {
    });

});

//describe('Array', function() {
//    describe('#indexOf()', function() {
//        it('should return -1 when the value is not present', function() {
//            const result = [1,2,3].indexOf(4);
//            expect(result).to.equal(-1);
//        });
//    });
//});
