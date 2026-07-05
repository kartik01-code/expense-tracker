import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    const error = new Error("Not authorized. Token is missing.");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not authorized. Invalid token.";
    throw error;
  }
});
