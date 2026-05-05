const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Log error for developer
  console.error(`[Error] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value entered' });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message });
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
