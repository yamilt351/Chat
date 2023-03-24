import User from "../models/users.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import createError from "http-errors";
import {
  validateInput,
  validatePassword,
  validateEmailFormat,
} from "../helpers/validation.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `${process.env.EMAIL}`,
      to: email,
      subject,
      text: "welcome",
      html,
    });
  } catch (error) {
    next(error);
  }
};

const getTemplate = (name, token) => {
  return `
	  <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img src=${process.env.IMAGE} alt="">
            <h2>Welcome ${name}</h2>
            <p>To confirm your account, please click de link below</p>
            <a
                href=${process.env.ROUTER}/${token}
                target="_blank"
            >Account Confirm</a>
        </div>

		`;
};
const confirmCode = async (req, res) => {
  const subject = "welcome";
  const username = req.body.username;
  const user = await User.findOne({ username: username });
  const user_Id = user.id;
  const template = getTemplate(username, user_Id);
  const email = req.body.email;
  const response = await sendEmail(email, subject, template);
  return response;
};

export const signup = async (req, res, next) => {
  console.log("signup");
  try {
    // Validate the input
    validateInput(req);
    validatePassword(req.body.password);
    validateEmailFormat(req.body.email);
    // Validate if the user exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      throw createError(400, "User already exists with this email or username");
    }

    // Encrypting password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create new user
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save(req);

    // Send confirmation code
    const emailResponse = await confirmCode(req, res);

    res.status(200).json({
      message: "Check your email to confirm your account",
      newUser,
      emailResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "wrong credentials!" });
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "wrong credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    console.log(res.cookie);
    res.cookie("acces_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    });
    console.log(res.cookie);
    res.json({ others, token });
  } catch (error) {
    next(error);
  }
};
