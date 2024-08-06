import jwt from 'jsonwebtoken';

export function verifyToken(token: string | undefined) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded; // Or map to your user object if needed
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}
