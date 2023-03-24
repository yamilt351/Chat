import jwt from "jsonwebtoken";
import createError from 'http-errors';

export const verify = (req, res, next) => {
  console.log("entrando verify");
  let token = req.cookies.acces_token;
  console.log(token + " cookies");
  if (!token) {
    console.log("no hay token");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("no hay token en headers");
      return next(createError(401, "Unauthorized"));
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0 !== "Bearer"]) {
      console.log("token no valid");
      return next(createError(401, "Unauthorized"));
    }
    token = tokenParts[1];
  }
  console.log("validando token");
  jwt.verify(token, process.env.JWT, (err, user) => {
    console.log("invalid");
    if (err) return next(createError(403, "Invalid token"));
    req.user = user;
    next(err);
  });
};
