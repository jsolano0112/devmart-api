import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Exception } from '../../helpers/exception-message';

//TODO: REVIEW LATER, SAVE TOKEN IN COOKIES IN THE FRONTEND
interface JWTPayload {
  email: string;
  isAdmin: boolean;
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
    throw new Exception('By generate token has ocurred error: ' + error, 401);
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
   return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Exception('Token expired.', 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Exception('Invalid Token.', 401);
    } else {
      throw new Exception('By verify token has ocurred error: ' + error, 401);
    }
  }
};
