import jwt from 'jsonwebtoken';

const CLAIM_TOKEN_SECRET = process.env.JWT_SECRET + '_claim';

export const generateClaimToken = (payload) => {
  return jwt.sign(payload, CLAIM_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyClaimToken = (token) => {
  return jwt.verify(token, CLAIM_TOKEN_SECRET);
};
