import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/User.js';
import verifySignature from '../utils/verifySignature.js';

export const generateNonce = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'walletAddress is required' });
  }

  const nonce = uuidv4();
  const message = `Sign this message to login: ${nonce}`;

  let user = await User.findOne({ walletAddress });

  if (!user) {
    user = await User.create({ walletAddress, nonce });
  } else {
    user.nonce = nonce;
    await user.save();
  }

  return res.status(200).json({ nonce, message });
};

export const verifySignatureAndLogin = async (req, res) => {
  const { walletAddress, signature, message } = req.body;

  if (!walletAddress || !signature || !message) {
    return res.status(400).json({ message: 'walletAddress, signature, and message are required' });
  }

  const user = await User.findOne({ walletAddress });

  if (!user || !user.nonce) {
    return res.status(400).json({ message: 'Nonce not found. Request a new nonce first.' });
  }

  const expectedMessage = `Sign this message to login: ${user.nonce}`;
  if (message !== expectedMessage) {
    return res.status(400).json({ message: 'Message mismatch' });
  }

  const isValid = verifySignature(message, signature, walletAddress);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  user.nonce = null;
  await user.save();

  const token = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return res.status(200).json({ token, walletAddress });
};

export const privyAuth = async (req, res) => {
  const { privyToken } = req.body;

  if (!privyToken) {
    return res.status(400).json({ message: 'privyToken is required' });
  }

  let privyUser;
  try {
    const response = await axios.get('https://auth.privy.io/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${privyToken}`,
        'privy-app-id': process.env.PRIVY_APP_ID,
      },
    });
    privyUser = response.data;
  } catch (err) {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      return res.status(401).json({ message: 'Invalid or expired Privy token' });
    }
    return res.status(502).json({ message: 'Privy authentication service unavailable' });
  }

  const email =
    privyUser.linked_accounts?.find((a) => a.type === 'email')?.address ||
    privyUser.email?.address ||
    null;

  const walletAddress =
    privyUser.linked_accounts?.find((a) => a.type === 'wallet')?.address ||
    privyUser.wallet?.address ||
    null;

  if (!email && !walletAddress) {
    return res.status(400).json({ message: 'Privy user has no usable email or wallet' });
  }

  const query = email ? { email } : { walletAddress };
  let user = await User.findOne(query);

  if (!user) {
    user = await User.create({
      walletAddress: walletAddress || undefined,
      email: email || undefined,
    });
  } else {
    if (walletAddress && !user.walletAddress) {
      user.walletAddress = walletAddress;
      await user.save();
    }
  }

  const jwtPayload = {};
  if (walletAddress) jwtPayload.walletAddress = walletAddress;
  if (email) jwtPayload.email = email;

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

  return res.status(200).json({ token, email, walletAddress });
};
