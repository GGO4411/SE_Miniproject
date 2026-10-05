const { verifyAccessToken } = require("../utils/jwt");
const { ApiError } = require("./errorHandler");

/**
 * Verifies the Bearer token on the Authorization header and attaches
 * the decoded payload to req.user. Use on any route that requires login.
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "UNAUTHENTICATED", "Missing or malformed Authorization header"));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch (err) {
    next(new ApiError(401, "UNAUTHENTICATED", "Invalid or expired token"));
  }
}

/**
 * Role-based access control. Usage: authorize("ORGANIZER", "ADMIN")
 * Enforced server-side, independent of any UI-level restriction
 * (per SAD Section 3.9 Security Architecture).
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "UNAUTHENTICATED", "You must be logged in"));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "FORBIDDEN", "You do not have permission to perform this action"));
    }
    next();
  };
}

module.exports = { authenticate, authorize };
