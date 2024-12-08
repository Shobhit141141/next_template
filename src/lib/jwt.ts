import { SignJWT, JWTPayload } from 'jose';
import { jwtVerify } from 'jose';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_jwt_secret');

export const signToken = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
};


export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", (error as Error).message);
    return null;
  }
};
