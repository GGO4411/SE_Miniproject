// Standardized error envelope, matching SAD Section 4.4:
// { error: { code, message } }
class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function notFoundHandler(req, res, next) {
  next(new ApiError(404, "NOT_FOUND", `Route ${req.method} ${req.originalUrl} not found`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = status === 500 ? "Something went wrong. Please try again." : err.message;

  // Never log sensitive data (passwords, tokens) here.
  if (status === 500) {
    console.error("[UNHANDLED ERROR]", err);
  }

  res.status(status).json({ error: { code, message } });
}

module.exports = { ApiError, notFoundHandler, errorHandler };
