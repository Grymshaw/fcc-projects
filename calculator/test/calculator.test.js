import chai from 'chai';
const should = chai.should();

import Calculator from './../src/js/calculator.js';


describe('Calculator', function() {
    const add = Calculator.add,
        subtract = Calculator.subtract,
        multiply = Calculator.multiply,
        divide = Calculator.divide;

    describe('#add()', function() {
        it('should correctly add whole numbers', function() {
            let result = add(4, 5);
            result.should.equal(9);
        });
        it('should correctly add decimals', function() {
            let result = add(4.22222, 7.11111);
            result.should.equal(11.33333);
        });
        it('should correctly add negative numbers', function() {
            let result = add(-4, -2);
            result.should.equal(-6);
        });
    });

    describe('#subtract()', function() {
        it('should correctly subtract whole numbers', function() {
            let result = subtract(5, 4);
            result.should.equal(1);
        });
        it('should correctly subtract decimals', function() {
            let result = subtract(3.222, 1.1111);
            result.should.equal(2.1109);
        });
        it('should correctly subtract negative numbers', function() {
            let result = subtract(-2, -4);
            result.should.equal(2);
        });
    });

    describe('#multiply()', function() {
        it('should correctly multiply whole numbers', function() {
            let result = multiply(5, 4);
            result.should.equal(20);
        });
        it('should correctly multiply decimals', function() {
            let result = multiply(3.222, 1.1111);
            result.should.equal(3.5799642);
        });
        it('should correctly multiply negative numbers', function() {
            let result = multiply(-3, 2);
            result.should.equal(-6);
        });
    });

    describe('#divide()', function() {
        it('should correctly divide whole numbers', function() {
            let result = divide(5, 4);
            result.should.equal(1.25);
        });
        it('should correctly divide decimals', function() {
            let result = divide(3.222, 0.1);
            result.should.equal(32.22);
        });
        it('should correctly divide negative numbers', function() {
            let result = divide(-3, 2);
            result.should.equal(-1.5);
        });

    });
});
