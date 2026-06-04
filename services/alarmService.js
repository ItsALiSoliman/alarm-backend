const Alarm = require("../models/Alarm");

const createAlarmService = async (name, interval, userId) => {
  if (!name || !interval) {
    throw new Error("Name and interval are required");
  }

  const alarm = await Alarm.create({
    name,
    interval,
    user: userId,
  });

  return alarm;
};

const getAllAlarmsService = async (userId) => {
  const alarms = await Alarm.find({
    user: userId,
  })

  return alarms;
};

const deleteAlarmService = async (alarmName, userId) => {
  const deletedAlarm = await Alarm.findOneAndDelete({
    name: alarmName,
    user: userId,
  });

  if (!deletedAlarm) {
    throw new Error("Alarm not found");
  }

  return deletedAlarm;
};

const getAlarmByNameService = async (alarmName, userId) => {
  const alarm = await Alarm.findOne({
    name: alarmName,
    user: userId,
  });

  if (!alarm) {
    throw new Error("Alarm not found");
  }

  return alarm;
};

const updateAlarmService = async (alarmName, data, userId) => {
  const updatedAlarm = await Alarm.findOneAndUpdate(
    { name: alarmName, user: userId },
    data,
    {
      new: true,
    }
  );

  if (!updatedAlarm) {
    throw new Error("Alarm not found");
  }

  return updatedAlarm;
};

module.exports = {
  createAlarmService,
  getAllAlarmsService,
  deleteAlarmService,
  getAlarmByNameService,
  updateAlarmService,
};
