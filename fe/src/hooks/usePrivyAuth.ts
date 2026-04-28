"use client";

import { useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";

/**
 * Convenience hook for Privy auth state.
 *
 * Exports the authenticated user, their Solana embedded wallet address,
 * loading state, and login/logout helpers.
 *
 * Used exclusively on beneficiary pages (/claim/*).
 */
export function usePrivyAuth() {
  const {
    user,
    authenticated,
    ready: privyReady,
    login,
    logout,
    getAccessToken,
  } = usePrivy();

  const { ready: walletsReady, wallets } = useWallets();

  const walletAddress = useMemo(() => {
    if (!walletsReady || !wallets || wallets.length === 0) return null;
    return wallets[0].address;
  }, [walletsReady, wallets]);

  const email = useMemo(() => {
    if (!user) return null;
    if (user.email?.address) return user.email.address;
    const emailAccount = user.linkedAccounts?.find(
      (a) => a.type === "email"
    );
    if (emailAccount && "address" in emailAccount) {
      return (emailAccount as { address: string }).address;
    }
    return null;
  }, [user]);

  return {
    user,
    email,
    walletAddress,
    isLoading: !privyReady || !walletsReady,
    isAuthenticated: authenticated,
    login,
    logout,
    getAccessToken,
  };
}
