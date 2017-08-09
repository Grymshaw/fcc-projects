import "normalize.css";
import "../styles/main.scss";
import $ from 'jquery';
import Timer from './Timer.js';

(() => {

    // Initialize variables
    let mainTime = 0,
        breakTime = 0,
        initialMainTime = null,
        initialBreakTime = null,
        isTimerStarted = false,
        isTimerInitialized = false,
        breakTimer,
        mainTimer;

    // Cache DOM
    const $mainMinutes = $('.js-main-minutes'),
        $mainSeconds = $('.js-main-seconds'),
        $breakMinutes = $('.js-break-minutes'),
        $breakSeconds = $('.js-break-seconds'),
        $startButton = $('.js-start-button'),
        $pauseButton = $('.js-pause-button'),
        $resetButton = $('.js-reset-button');

    // Bind Events
    $startButton.on('click', () => {
        isTimerStarted = true;
        mainTime = ( parseInt($mainMinutes.val()) * 60 + parseInt($mainSeconds.val()) ) * 1000;
        breakTime = ( parseInt($breakMinutes.val()) * 60 + parseInt($breakSeconds.val()) ) * 1000;
        if(!isTimerInitialized) {
            initialMainTime = ( parseInt($mainMinutes.val()) * 60 + parseInt($mainSeconds.val()) ) * 1000;
            initialBreakTime = ( parseInt($breakMinutes.val()) * 60 + parseInt($breakSeconds.val()) ) * 1000;
            isTimerInitialized = true;
        }
        toggleInputs();
        toggleButtonVisibility();
        initializeTimers();
        mainTimer.start();
    });
    $pauseButton.on('click', () => {
        //pause timers
        if(mainTimer.isStarted)
            mainTimer.pause();
        if(breakTimer.isStarted)
            breakTimer.pause();
        //change which buttons are visible
        toggleButtonVisibility();
    });
    $resetButton.on('click', () => {
        if(isTimerInitialized) {
            mainTime = initialMainTime;
            breakTime = initialBreakTime;
            isTimerInitialized = false;
            isTimerStarted = false;
            initializeTimers();
            render();
            toggleInputs();
        }
    });

    function initializeTimers() {
        breakTimer = new Timer(breakTime, () => {
            alert('Break timer finished!');
            isTimerStarted = false;
            toggleButtonVisibility();
            toggleInputs();
        });
        addTimerTickCallback(breakTimer, $breakMinutes, $breakSeconds);

        mainTimer = new Timer(mainTime, () => {
            breakTimer.start();
        });
        addTimerTickCallback(mainTimer, $mainMinutes, $mainSeconds);
    }

    function render() {
        $mainMinutes.val( getDisplayNumber(getMinutes(mainTimer.timeRemaining)) );
        $mainSeconds.val( getDisplayNumber(getSeconds(mainTimer.timeRemaining)) );
        $breakMinutes.val( getDisplayNumber(getMinutes(breakTimer.timeRemaining)) );
        $breakSeconds.val( getDisplayNumber(getSeconds(breakTimer.timeRemaining)) );
    }

    function getDisplayNumber(num) {
        if(num < 10) {
            return '0' + num.toString();
        }
        return num.toString();
    }

    function addTimerTickCallback(timer, $minutes, $seconds) {
        timer.tickCallback = () => {
            let timeRemaining = timer.timeRemaining;
            render();
        };
    }

    function toggleButtonVisibility() {
        $startButton.toggleClass('hidden');
        $pauseButton.toggleClass('hidden');
        $resetButton.toggleClass('hidden');
    }

    function toggleInputs() {
        $mainMinutes.attr('disabled', isTimerStarted);
        $mainSeconds.attr('disabled', isTimerStarted);
        $breakMinutes.attr('disabled', isTimerStarted);
        $breakSeconds.attr('disabled', isTimerStarted);
    }

    function getMinutes(ms) {
        return (ms / 1000 - getSeconds(ms)) / 60;
    }

    function getSeconds(ms) {
        return ms / 1000 % 60;
    }

})();




