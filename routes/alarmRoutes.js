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

/**
 * @swagger
 * /alarms:
 *   post:
 *     summary: Create a new alarm
 *     tags:
 *       - Alarms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - interval
 *             properties:
 *               name:
 *                 type: string
 *                 example: Study
 *               interval:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Alarm created successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/", authMiddleware, validateAlarm, createAlarm);

/**
 * @swagger
 * /alarms:
 *   get:
 *     summary: Get all alarms
 *     tags:
 *       - Alarms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of alarms per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by alarm name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field
 *     responses:
 *       200:
 *         description: List of alarms
 *       401:
 *         description: Unauthorized
 */

router.get("/", authMiddleware,getAllAlarms);

/**
 * @swagger
 * /alarms/{name}:
 *   get:
 *     summary: Get alarm by name
 *     tags:
 *       - Alarms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Alarm name
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Alarm not found
 */

router.get("/:name", authMiddleware, getAlarmByName);

/**
 * @swagger
 * /alarms/{name}:
 *   put:
 *     summary: Update alarm
 *     tags:
 *       - Alarms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               interval:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated successfully
 */

router.put("/:name", authMiddleware, updateAlarm);

/**
 * @swagger
 * /alarms/{name}:
 *   delete:
 *     summary: Delete alarm
 *     tags:
 *       - Alarms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

router.delete("/:name", authMiddleware, deleteAlarm);

module.exports = router;
