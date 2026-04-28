import Beneficiary from '../models/Beneficiary.js';
import Switch from '../models/Switch.js';

/**
 * POST /claim/register/:switchId
 *
 * Registers a beneficiary claim. The beneficiary authenticates via Privy
 * (email / Google), and their embedded Solana wallet is used to receive assets.
 *
 * Expects:
 *   - req.privyUser.userId       (from privyAuthMiddleware)
 *   - req.privyUser.walletAddress (from privyAuthMiddleware)
 *   - req.privyUser.email        (from privyAuthMiddleware)
 *   - req.body.walletAddress     (client-supplied, cross-checked)
 *   - req.params.switchId        (from URL)
 */
export const registerClaim = async (req, res) => {
  const { switchId } = req.params;
  const { walletAddress: clientWallet } = req.body;
  const { userId, walletAddress: privyWallet, email } = req.privyUser;

  // ── Validate switch exists ──
  const sw = await Switch.findById(switchId);
  if (!sw) {
    return res.status(404).json({ message: 'Switch not found' });
  }

  // ── Anti-spoofing: client wallet must match Privy-verified wallet ──
  if (privyWallet && clientWallet && privyWallet !== clientWallet) {
    return res.status(403).json({
      message: 'Wallet address mismatch — possible spoofing attempt',
    });
  }

  const resolvedWallet = privyWallet || clientWallet;
  if (!resolvedWallet) {
    // Privy embedded wallet may not be provisioned yet for brand-new users.
    // Return 202 so the frontend can retry after a short delay.
    return res.status(202).json({
      message: 'Wallet still being provisioned by Privy. Please retry in a few seconds.',
      retryAfter: 3,
    });
  }

  // ── Check if beneficiary is authorised for this switch ──
  const beneficiary = await Beneficiary.findOne({
    switchId,
    email: email,
  });

  if (!beneficiary) {
    return res.status(403).json({
      message: 'No beneficiary record found for your email on this switch',
    });
  }

  // ── Store / update the claim ──
  beneficiary.walletAddress = resolvedWallet;
  beneficiary.privyUserId = userId;
  await beneficiary.save();

  return res.status(200).json({
    success: true,
    walletAddress: resolvedWallet,
    message: 'Claim registered — assets will arrive when the switch triggers',
  });
};
