const { registerService, loginService } = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerService(username, email, password);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        _id: user.id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    res.json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
