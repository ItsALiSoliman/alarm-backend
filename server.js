require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const Alarm = require("./models/Alarm");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const alarmRoutes = require("./routes/alarmRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use(loggerMiddleware);

app.use("/alarms", alarmRoutes);

app.use(errorMiddleware);

async function startServer() {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer();
