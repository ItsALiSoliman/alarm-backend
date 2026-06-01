const {
  createAlarmService,
  getAllAlarmsService,
  startAlarmService,
  deleteAlarmService,
  getAlarmByNameService,
  updateAlarmService,
} = require("../services/alarmService");

const createAlarm = async (req, res, next) => {
  try {
    const { name, interval } = req.body;

    await createAlarmService(name, interval);

    res.status(201).json({
      status: "success",
      message: "Alarm created",
    });
  } catch (error) {
    next(error);
  }
};

const getAllAlarms = async (req, res, next) => {
  try {
    const alarms = await getAllAlarmsService();

    res.json({
      status: "success",
      data: alarms,
    });
  } catch (error) {
    next(error);
  }
};

const startAlarm = (req, res, next) => {
  try {
    const alarmName = req.params.name;

    startAlarmService(alarmName);

    res.json({
      status: "success",
      message: `${alarmName} started`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAlarm = async (req, res, next) => {
  try {
    const alarmName = req.params.name;

    await deleteAlarmService(alarmName);

    res.json({
      status: "success",
      message: `${alarmName} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const getAlarmByName = async (req, res, next) => {
  try {
    const alarmName = req.params.name;

    const alarm = await getAlarmByNameService(alarmName);

    res.json({
      status: "success",
      data: alarm,
    });
  } catch (error) {
    next(error);
  }
};

const updateAlarm = async (req, res, next) => {
  try {
    const alarmName = req.params.name;

    const updatedAlarm = await updateAlarmService(alarmName, req.body);

    res.json({
      status: "success",
      message: "Alarm updated",
      data: updatedAlarm,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAlarm,
  getAllAlarms,
  startAlarm,
  deleteAlarm,
  getAlarmByName,
  updateAlarm,
};