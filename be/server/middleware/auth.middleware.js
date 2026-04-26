import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  const query = decoded.walletAddress
    ? { walletAddress: decoded.walletAddress }
    : { email: decoded.email };

  const user = await User.findOne(query);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = {
    _id: user._id,
    walletAddress: user.walletAddress || null,
    email: user.email || null,
    worldIdVerified: user.worldIdVerified,
  };

  next();
};

export default authMiddleware;
