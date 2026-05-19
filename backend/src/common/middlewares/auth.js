import { AppError } from "../errors/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { User } from "../../modules/users/model/user.model.js";
import { ROLES } from "../constants/roles.js";

const extractBearerToken = (authorization = "") => {
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }
  return token;
};

export const protect = async (req, _res, next) => {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId).select("-password");

    if (!user || !user.isActive) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = {
      userId: user._id.toString(),
      role: user.role,
      firstLoginRequired: user.firstLoginRequired
    };
    return next();
  } catch (_error) {
    return next(new AppError("Unauthorized", 401));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError("Forbidden", 403));
  }
  return next();
};

export const ensureFirstLoginCompleted = (req, _res, next) => {
  if (req.user?.role === ROLES.ADMIN && req.user.firstLoginRequired) {
    return next(new AppError("Password change required before accessing this route", 403));
  }
  return next();
};

