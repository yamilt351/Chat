import User from "../models/users.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import {
  validateInput,
  validatePassword,
  validateEmailFormat,
} from "../helpers/validation.js";
import speakeasy from "speakeasy";

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
                href=${process.env.EMAIL_ROUTER}/${token}
                target="_blank"
            >Account Confirm</a>
        </div>

		`;
};
const confirmCode = async (username, userId, email) => {
  const subject = "welcome";
  const template = getTemplate(username, userId);
  await sendEmail(email, subject, template);
  return { success: true };
};

const sendEmail = async (email, subject, html) => {
  await transporter.sendMail({
    from: `${process.env.EMAIL}`,
    to: email,
    subject,
    text: "welcome",
    html,
  });
};


const sendTwoFactorTokenByEmail = async (email, token) => {
  const subject = "Your session code";
  const template = `
    <head>
      <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content">
      <img src=${process.env.IMAGE} alt="">
      <h2>Your session code is: ${token}</h2>
      <p>This code will expire in 10 minutes. Please use it to complete your login.</p>
    </div>
  `;
  
  await sendEmail(email, subject, template);
};


const twoFactor = async () => {
  try {
    const secret = speakeasy.generateSecret({ length: 20 }); // Genera un secreto aleatorio
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
      time: 600, // El token será válido por 10 minutos
    });
    return token;
  } catch (error) {
    throw error;
  }
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
      throw createError(401, "wrong credentials!");
    }
    if (!user.verified) {
      throw createError(401, "User not verified, please check your email");
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      throw createError(400, "wrong credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    console.log(res.cookie);
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    });
    console.log(res.cookie);
    const twoFactorToken =await twoFactor();
    await sendTwoFactorTokenByEmail(user.email, twoFactorToken);
    res.json({token });
  } catch (error) {
    next(error);
  }
};
