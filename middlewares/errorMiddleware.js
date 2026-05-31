const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    status: "Error",
    message: "Internal Server Error",
  });
}

module.exports = errorMiddleware;