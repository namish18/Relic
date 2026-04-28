import { PrivyClient } from '@privy-io/server-auth';

/**
 * Singleton PrivyClient for server-side Privy token verification.
 *
 * Reads PRIVY_APP_ID and PRIVY_APP_SECRET from environment variables.
 */
const privyClient = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET
);

export default privyClient;
