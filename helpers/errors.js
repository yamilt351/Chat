import Error from 'http-errors'

export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

export const notFoundMiddleware = (req, res, next) => {
  next(Error.NotFound());
};
