export default class Timer {
    constructor(time, callback) {
        this.time = time;
        this.timeRemaining = time;
        this.isDone = false;
        this.intervals = [];
        this.doneCallback = callback;
        this.tick = 1000; //interval time in ms
        this.isStarted = false;
        this.pauseTime = null;
        this.lastTick = null;
    }
    start() {
        if(this.pauseTime) {
            //time has been paused. Must account for this in next tick
            let timeDifference = this.pauseTime - this.lastTick;
            //reduce remaining time by amount that ellapsed in last tick
            //plus the tick time
            this.decreaseRemainingTime(this.tick + timeDifference);
            //re-add interval after correct time til next tick has ellapsed
            let self = this;
            setTimeout(() => {

                self.intervals.push(setInterval(() => {
                    self.decreaseRemainingTime(self.tick);
                }, self.tick));
            }, this.tick - timeDifference);
            //no longer paused
            this.pauseTime = null;
        } else {
            this.isStarted = true;
            this.intervals.push(setInterval(() => {
                this.decreaseRemainingTime(this.tick);
            }, this.tick));
        }
    }
    decreaseRemainingTime(time) {
        if(this.timeRemaining - time <= 0) {
            this.timeRemaining = 0;
            this.isDone = true;
            this.clearIntervals();
            this.doneCallback();
        } else {
            this.lastTick = Date.now();
            this.timeRemaining -= time;
            this.isDone = this.timeRemaining <= 0;
        }
    }
    pause() {
        if(this.isStarted) {
            //timer has been started
            this.pauseTime = Date.now();
        }
        this.clearIntervals();
    }
    getRemainingTime() {
        return this.timeRemaining;
    }
    reset() {
        this.timeRemaining = this.time;
        this.isDone = false;
        this.clearIntervals();
        this.intervals = [];
    }
    clearIntervals() {
        this.intervals.forEach((val) => {
            clearInterval(val);
        });
    }
}
