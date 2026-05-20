import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  // We assume verifyToken has already run and populated req.user with { id: ... }
  if (!req.user || !req.user.id) {
    return next(errorHandler(401, "Unauthorized: No user data found"));
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.role !== 'admin') {
      return next(errorHandler(403, "Forbidden: Admins only"));
    }

    next();
  } catch (error) {
    next(error);
  }
};
