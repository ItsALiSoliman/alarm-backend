const express = require("express");

const {
  createAlarm,
  getAllAlarms,
  startAlarm,
  deleteAlarm,
  getAlarmByName,
  updateAlarm,
} = require("../controllers/alarmController");

const router = express.Router();

router.post("/", createAlarm);

router.get("/", getAllAlarms);

router.get("/:name", getAlarmByName);

router.post("/start/:name", startAlarm);

router.put("/:name", updateAlarm);

router.delete("/:name", deleteAlarm);

module.exports = router;
