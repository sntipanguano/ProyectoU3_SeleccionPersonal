import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  try {
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export default authenticate;

