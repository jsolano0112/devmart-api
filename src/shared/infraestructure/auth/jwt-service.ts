import jwt from 'jsonwebtoken';
import 'dotenv/config';

//TODO: REVIEW LATER, SAVE TOKEN IN COOKIES IN THE FRONTEND
interface JWTPayload {
  email: string;
  role: string;
  uuid: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;

export const generateToken = (payload: JWTPayload): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRE_IN,
    });
  } catch (error) {
    throw new Error('Token has ocurred error: ' + error);
  }
};
