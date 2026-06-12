const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
