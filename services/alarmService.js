const Alarm = require("../models/Alarm");

const createAlarmService = async (name, interval) => {
  if (!name || !interval) {
    throw new Error("Name and interval are required");
  }

  const alarm = await Alarm.create({
    name,
    interval,
  });

  return alarm;
};

const getAllAlarmsService = async () => {
  const alarms = await Alarm.find();

  return alarms;
};

const startAlarmService = async (alarmName) => {
  const alarm = await Alarm.findOne({
    name: alarmName,
  });

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  alarm.start();

  return alarm;
};

const deleteAlarmService = async (alarmName) => {
  const deletedAlarm = await Alarm.findOneAndDelete({
    name: alarmName,
  });

  if (!deletedAlarm) {
    throw new Error("Alarm not found");
  }

  return deletedAlarm;
};

const getAlarmByNameService = async (alarmName) => {
  const alarm = await Alarm.findOne({
    name: alarmName,
  });

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  return alarm;
};

const updateAlarmService = async (alarmName, data) => {
  const updatedAlarm = await Alarm.findOneAndUpdate({ name: alarmName }, data, {
    new: true,
  });

  if (!updatedAlarm) {
    throw new Error("Alarm not found");
  }

  return updatedAlarm;
};

module.exports = {
  createAlarmService,
  getAllAlarmsService,
  startAlarmService,
  deleteAlarmService,
  getAlarmByNameService,
  updateAlarmService,
};
