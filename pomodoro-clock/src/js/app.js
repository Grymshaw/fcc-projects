import "normalize.css";
import "../styles/main.scss";
import Timer from './Timer.js';

let start, end;

const breakTimer = new Timer(5000, () => {
    console.log('Break timer finished');
});
const mainTimer = new Timer(5 * 1000, () => {
    console.log('Main timer finished');
    end = Date.now();
    console.log(end - start);
    breakTimer.start();
});

start = Date.now();
mainTimer.start();

setTimeout(() => {
    console.log('pausing timer at ' + Date.now());
    mainTimer.pause();
}, 1500);
setTimeout(() => {
    console.log('unpausing timer at ' + Date.now());
    mainTimer.start();
}, 2000);


