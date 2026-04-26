import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import verifySignature from '../utils/verifySignature.js';

export const generateNonce = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'walletAddress is required' });
  }

  const nonce = uuidv4();

  let user = await User.findOne({ walletAddress });

  if (!user) {
    user = await User.create({ walletAddress, nonce });
  } else {
    user.nonce = nonce;
    await user.save();
  }

  const message = `Sign this message to authenticate with Relic.\nNonce: ${nonce}`;
  return res.status(200).json({ message });
};

export const verifySignatureAndLogin = async (req, res) => {
  const { walletAddress, signature } = req.body;

  if (!walletAddress || !signature) {
    return res.status(400).json({ message: 'walletAddress and signature are required' });
  }

  const user = await User.findOne({ walletAddress });

  if (!user || !user.nonce) {
    return res.status(400).json({ message: 'Nonce not found. Request a new nonce first.' });
  }

  const message = `Sign this message to authenticate with Relic.\nNonce: ${user.nonce}`;
  const isValid = verifySignature(message, signature, walletAddress);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  user.nonce = null;
  await user.save();

  const token = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return res.status(200).json({ token, walletAddress });
};
