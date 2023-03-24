import createError from "http-errors";
import { validationResult } from "express-validator";
// Helper functions
export const validateInput = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createError(422, { errors: errors.array() });
  }
};

export const validatePassword = (password) => {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
      password
    )
  ) {
    throw createError(400, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a length of at least 12 characters",
    });
  }
};

export const validateEmailFormat = (email) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw createError(400, { message: "Invalid email format" });
  }
};
