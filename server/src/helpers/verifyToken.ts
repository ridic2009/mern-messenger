import jwt from "jsonwebtoken";

export default async function verifyToken(token: any) {
  const secret = process.env.TOKEN_SECRET

  if (!secret) {
    console.log("Секретный ключ не определён");
    return
  }

  try {

    const decodedData = jwt.verify(token, secret);

    return decodedData;

  } catch (err) {
    console.log(err);
  }
}
