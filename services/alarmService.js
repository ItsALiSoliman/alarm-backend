const Alarm = require("../models/Alarm");
const AppError = require("../utils/AppError");

const createAlarmService = async (name, interval, userId) => {
  const alarm = await Alarm.create({
    name,
    interval,
    user: userId,
  });

  return alarm;
};

const getAllAlarmsService = async (
  userId,
  role,
  page,
  limit,
  search,
  sort,
  interval,
  minInterval,
  maxInterval,
) => {
  const filter = {};

  if (role !== "admin") {
    filter.user = userId;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (interval) {
    filter.interval = Number(interval);
  }

  if (minInterval || maxInterval) {
    filter.interval = {};
    if (minInterval) {
      filter.interval.$gte = Number(minInterval);
    }
    if (maxInterval) {
      filter.interval.$lte = Number(maxInterval);
    }
  }

  console.log("ROLE:", role);
  console.log("FILTER:", filter);

  const alarms = await Alarm.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  return alarms;
};

const deleteAlarmService = async (alarmName, userId) => {
  const deletedAlarm = await Alarm.findOneAndDelete({
    name: alarmName,
    user: userId,
  });

  if (!deletedAlarm) {
    throw new AppError("Alarm not found", 404);
  }

  return deletedAlarm;
};

const getAlarmByNameService = async (alarmName, userId) => {
  const alarm = await Alarm.findOne({
    name: alarmName,
    user: userId,
  });

  if (!alarm) {
    throw new AppError("Alarm not found", 404);
  }

  return alarm;
};

const updateAlarmService = async (alarmName, data, userId) => {
  const updatedAlarm = await Alarm.findOneAndUpdate(
    { name: alarmName, user: userId },
    data,
    {
      new: true,
    },
  );

  if (!updatedAlarm) {
    throw new AppError("Alarm not found", 404);
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
