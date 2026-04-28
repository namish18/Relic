import privyClient from '../lib/privy.js';

/**
 * Privy token verification middleware.
 *
 * Reads the Privy access-token from the Authorization: Bearer header,
 * verifies it via the Privy server SDK, fetches the user record, and
 * attaches { userId, walletAddress, email } to req.privyUser.
 *
 * Used on beneficiary-facing routes (/claim/*).
 */
const privyAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Privy access token' });
  }

  const token = authHeader.split(' ')[1];

  let claims;
  try {
    claims = await privyClient.verifyAuthToken(token);
  } catch (err) {
    console.error('[PrivyAuth] Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired Privy token' });
  }

  // Fetch full Privy user to get linked wallets and email
  let privyUser;
  try {
    privyUser = await privyClient.getUser(claims.userId);
  } catch (err) {
    console.error('[PrivyAuth] Failed to fetch Privy user:', err.message);
    return res.status(502).json({ message: 'Privy service unavailable' });
  }

  // Extract Solana embedded wallet
  const solanaWallet =
    privyUser.linkedAccounts?.find(
      (a) => a.type === 'wallet' && a.walletClientType === 'privy' && a.chainType === 'solana'
    ) ||
    privyUser.linkedAccounts?.find(
      (a) => a.type === 'wallet' && a.chainType === 'solana'
    ) ||
    null;

  // Extract email
  const email =
    privyUser.linkedAccounts?.find((a) => a.type === 'email')?.address ||
    privyUser.email?.address ||
    null;

  req.privyUser = {
    userId: claims.userId,
    walletAddress: solanaWallet?.address || null,
    email,
  };

  next();
};

export default privyAuthMiddleware;
