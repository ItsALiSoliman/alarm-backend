const AppError = require("../utils/AppError");

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("Username, email and password are required", 400));
  }

  if (username.length < 3) {
    return next(new AppError("Username must be at least 3 characters", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  next();
};

module.exports = validateRegister;