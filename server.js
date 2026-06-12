require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const express = require("express");

const connectDB = require("./config/db");
const Alarm = require("./models/Alarm");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const alarmRoutes = require("./routes/alarmRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use(limiter);

app.use("/api/v1/auth", authRoutes);

app.use(loggerMiddleware);

app.use("/api/v1/alarms", alarmRoutes);

app.use(errorMiddleware);

async function startServer() {
  await connectDB();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer();
