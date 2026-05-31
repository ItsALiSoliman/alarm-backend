const Alarm = require("../Alarm");

const alarms = {};

const createAlarmService = async (name, interval) => {
  if (!name || !interval) {
    throw new Error("Name and interval are required");
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const alarm = new Alarm(name, interval);

  alarms[name] = alarm;

  alarm.on("alarmFired", (data) => {
    console.log(data.message);
  });

  return alarm;
};

const getAllAlarmsService = () => {
  return Object.values(alarms).map((alarm) => {
    return {
      name: alarm.name,
      interval: alarm.interval,
    };
  });
};

const startAlarmService = (alarmName) => {
  const alarm = alarms[alarmName];

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  alarm.start();

  return alarm;
};

const deleteAlarmService = (alarmName) => {
  const alarm = alarms[alarmName];

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  alarm.stop();

  delete alarms[alarmName];

  return true;
};

const getAlarmByNameService = (alarmName) => {
  const alarm = alarms[alarmName];

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  return {
    name: alarm.name,
    interval: alarm.interval,
  };
};

const updateAlarmService = (alarmName, data) => {
  const alarm = alarms[alarmName];

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  if (data.name) {
    alarm.name = data.name;
  }

  if (data.interval) {
    alarm.interval = data.interval;
  }

  return {
    name: alarm.name,
    interval: alarm.interval,
  };
};

module.exports = {
  createAlarmService,
  getAllAlarmsService,
  startAlarmService,
  deleteAlarmService,
  getAlarmByNameService,
  updateAlarmService,
};
