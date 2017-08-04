import $ from 'jquery';

var calculator = (() => {

    /*** Initialize variables ***/
    let inputEntered,
        decimalAdded,
        currentOperator,
        previousOperator,
        current,
        total;

    /*** Cache DOM ***/
    let $display = $('.display'),
        $clear = $('.button--clear'),
        $clearEntry = $('.button--clear-entry'),
        $correction = $('.button--correction'),
        $decimal = $('.button--decimal'),
        $negation = $('.button--negation'),
        $divide = $('.button--divide'),
        $equals = $('.button--equals'),
        $minus = $('.button--subtract'),
        $multiply = $('.button--multiply'),
        $plus = $('.button--plus'),
        $numbers = $('.button--number');

    /*** Bind events ***/
    //Clear button
    $clear.on('click', clear);
    //Clear entry button
    $clearEntry.on('click', clearCurrent);
    //Correction button
    $correction.on('click', makeCorrection);
    //Operators
    $.each([$plus, $minus, $multiply, $divide, $equals], (i, val) => {
        val.on('click', () => {
            console.log(val.html());
            setOperator(val.html());
        });
    });
    //Negation button
    $negation.on('click', negate);
    //Nubers and decimals
    $.each([...$numbers, $decimal], (i, val) => {
        $(val).on('click', () => {
            console.log($(val).html());
            updateCurrent($(val).html());
        });
    });
    //Keyboard input
    $(window).on('keypress', (e) => {
        console.log(e.which);
        let key = e.which;
        if(key >= 48 && key <= 57) {
            updateCurrent(key - 48); //[0-9]
        } else if (key === 42 || key === 43 || key === 45 || key === 47 || key === 61) {
            setOperator(String.fromCharCode(key)); // *, +, -, /, and = (respectively)
        } else if (key === 13) {
            setOperator('='); //<ENTER>
        }
    });

    /*** Run init ***/
    init();

    /*** Helper Functions ***/
    function init() {
        clear();
        render();
    }
    function clear() {
        inputEntered = false;
        decimalAdded = false;
        currentOperator = '';
        previousOperator = '';
        current = '0';
        total = 0;
        render();
    }
    function clearCurrent() {
        inputEntered = false;
        decimalAdded = false;
        current = '0';
        render();
    }
    function updateCurrent(value) {
        if(value === '.') {
            if(!decimalAdded) {
                current += '.';
                decimalAdded = true;
            }
        } else {
            if(current === '0') {
                current = value.toString();
            } else {
                current += value.toString();
            }
        }
        inputEntered = true;
        render();
    }
    function makeCorrection() {
        //either
        if((current.length > 1 && current.length[0] !== '-') || (current.length > 2 && current.length[0] === '-')) {
                current = current.substr(0, current.length - 1);
                console.log(current + ' after correction');
        } else if ((current.length === 1) || (current.length === 2 && current[0] === '-')) {
            clearCurrent();
        }
        render();
    }
    function negate() {
        inputEntered = true;
        current = (-1 * parseFloat(current)).toString();
        render();
    }
    function setOperator(operator) {
        previousOperator = currentOperator;
        calculate();
        currentOperator = operator;
    }
    function calculate() {
        if(inputEntered) {
            let num = parseFloat(current);
            console.log(previousOperator);
            console.log('number: ' + num);
            console.log(typeof num);
            switch (previousOperator) {
                case '+':
                    total += num;
                    break;
                case '-':
                    total -= num;
                    break;
                case '*':
                    total *= num;
                    break;
                case '/':
                    if(num === 0) {
                        total = 'NaN';
                    }
                    else {
                        total /= num;
                    }
                    break;
                default:
                    total = num;
            }
            current = '0';
            inputEntered = false;
            render();
        }
    }
    function render() {
        if(inputEntered) {
            $display.html(current);
        } else {
            $display.html(total);
        }
    }
})();

export { calculator };
