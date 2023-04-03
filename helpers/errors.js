import Error from "http-errors";

export const handleError = (error, res) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).json({ error: { status, message } });
};

export const errorMiddleware = (err, req, res, next) => {
  handleError(err, res);
};

export const notFoundMiddleware = (req, res, next) => {
  next(Error.NotFound());
};
