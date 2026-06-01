const express = require("express");

const connectDB = require("./config/db");
const Alarm = require("./models/Alarm");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const alarmRoutes = require("./routes/alarmRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/alarms", alarmRoutes);

app.use(errorMiddleware);

async function startServer() {
  await connectDB();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
