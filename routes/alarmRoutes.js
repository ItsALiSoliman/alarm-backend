const express = require("express");

const {
  createAlarm,
  getAllAlarms,
  startAlarm,
  deleteAlarm,
  getAlarmByName,
  updateAlarm,
} = require("../controllers/alarmController");

const authMiddleware = require("../middlewares/authMiddleware");

const validateAlarm = require("../middlewares/validateAlarm");

const router = express.Router();

router.post("/", authMiddleware, validateAlarm, createAlarm);

router.get("/", authMiddleware,getAllAlarms);

router.get("/:name", authMiddleware, getAlarmByName);

router.put("/:name",authMiddleware, updateAlarm);

router.delete("/:name", authMiddleware, deleteAlarm);

module.exports = router;
