import { ZodError } from "zod";
import { errorHandler } from "../utils/error.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues || error.errors || [];
      const errorMessages = issues.map((err) => err.message).join(', ');
      return next(errorHandler(400, errorMessages));
    }
    next(error);
  }
};
