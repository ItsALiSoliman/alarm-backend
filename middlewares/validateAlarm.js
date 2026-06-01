const validateAlarm = (req, res, next) => {
  const { name, interval } = req.body;

  if (typeof name !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "Name must be a string",
    });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be at least 3 characters",
    });
  }

  if (typeof interval !== "number") {
    return res.status(400).json({
      status: "fail",
      message: "Interval must be a number",
    });
  }

  if (interval <= 0) {
    return res.status(400).json({
      status: "fail",
      message: "Interval must be greater than 0",
    });
  }

  next();
};

module.exports = validateAlarm;
