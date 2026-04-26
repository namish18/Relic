import Switch from '../models/Switch.js';
import Beneficiary from '../models/Beneficiary.js';
import Vault from '../models/Vault.js';
import { verifyClaimToken } from '../utils/token.js';
import { sendToken } from '../services/solana.service.js';

const unlockMessages = async (vault) => {
  return vault.messages.map((msg) => ({
    recipient: msg.recipient,
    content: `[Arcium Mock Decrypted] ${msg.encryptedContent}`,
  }));
};

export const redeemClaim = async (req, res) => {
  const { token, privyWallet } = req.body;

  if (!token || !privyWallet) {
    return res.status(400).json({ message: 'token and privyWallet are required' });
  }

  let decoded;
  try {
    decoded = verifyClaimToken(token);
  } catch {
    return res.status(401).json({ message: 'Invalid or expired claim token' });
  }

  const { switchId, beneficiaryId, email } = decoded;

  const sw = await Switch.findById(switchId);
  if (!sw) {
    return res.status(404).json({ message: 'Switch not found' });
  }

  if (sw.status !== 'COMPLETED') {
    return res.status(403).json({ message: 'Switch has not been executed yet' });
  }

  const beneficiary = await Beneficiary.findById(beneficiaryId);
  if (!beneficiary) {
    return res.status(404).json({ message: 'Beneficiary not found' });
  }

  if (String(beneficiary.switchId) !== String(switchId)) {
    return res.status(403).json({ message: 'Beneficiary does not belong to this switch' });
  }

  if (beneficiary.email !== email) {
    return res.status(403).json({ message: 'Email mismatch' });
  }

  if (beneficiary.hasClaimed) {
    return res.status(409).json({ message: 'Assets have already been claimed' });
  }

  const vault = await Vault.findOne({ switchId });
  if (!vault) {
    return res.status(404).json({ message: 'Vault not found' });
  }

  const totalAmount = vault.assets.reduce((sum, a) => sum + a.amount, 0);
  const share = (beneficiary.percentage / 100) * totalAmount;

  await sendToken({ to: privyWallet, amount: share });

  beneficiary.hasClaimed = true;
  beneficiary.walletAddress = privyWallet;
  await beneficiary.save();

  const unlockedMessages = await unlockMessages(vault);
  const files = vault.files.map((f) => ({
    fileName: f.fileName,
    cdpUrl: f.cdpUrl,
  }));

  return res.status(200).json({
    message: 'Claim successful',
    share,
    privyWallet,
    unlockedMessages,
    files,
  });
};
