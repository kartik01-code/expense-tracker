import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

const authResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

export const registerUser = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    const error = new Error("User already exists with this email");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create(data);

  authResponse(user, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);

  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user || !(await user.matchPassword(data.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  authResponse(user, 200, res);
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});
