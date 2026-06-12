const AppError = require("../utils/AppError");

const validateAlarm = (req, res, next) => {
  const { name, interval } = req.body;

  if (!name || !interval) {
    return next(new AppError("Name and interval are required", 400));
  }

  if (name.length < 3) {
    return next(new AppError("Alarm name must be at least 3 characters", 400));
  }

  if (typeof interval !== "number") {
    return next(new AppError("Interval must be a number", 400));
  }

  next();
};

module.exports = validateAlarm;
