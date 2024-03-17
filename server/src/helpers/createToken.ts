import jwt from "jsonwebtoken";

export function createToken(userData: any): string {
  const secret = process.env.TOKEN_SECRET || "";

  const data = {
    _id: userData._id,
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname
  }

  if (!secret) console.log("Секретный ключ не определён");

  const token = jwt.sign(data, secret, {
    expiresIn: process.env.TOKEN_MAX_AGE,
    algorithm: "HS256",
  });

  return token;
}
