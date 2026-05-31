const EventEmitter = require("events");

class Alarm extends EventEmitter {
  constructor(name, intervalInSec) {
    super();

    this.name = name;
    this.interval = intervalInSec;

    this.timeout = null;
  }

  start() {
    this.timeout = setTimeout(() => {
      this.emit("alarmFired", {
        message: `${this.name} fired`,
      });
    }, this.interval * 1000);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}

module.exports = Alarm;
