"use client";

import { useCallback, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * Sign-In With Solana (SIWS) hook.
 *
 * Flow:
 *  1. POST /auth/nonce  → get { nonce, message }
 *  2. wallet.signMessage(encodedMessage)
 *  3. POST /auth/verify → get { token, walletAddress }
 *  4. store JWT in localStorage as 'relic_token'
 */
export function useSIWS() {
  const { publicKey, signMessage, connected } = useWallet();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (): Promise<string | null> => {
    if (!publicKey || !signMessage) {
      setError("Wallet not connected or does not support message signing");
      return null;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      // 1. Request nonce from backend
      const nonceRes = await fetch(`${BACKEND_URL}/auth/nonce`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: publicKey.toBase58() }),
      });

      if (!nonceRes.ok) {
        throw new Error("Failed to get nonce from server");
      }

      const { message } = await nonceRes.json();

      // 2. Sign the nonce message with the wallet
      const encodedMessage = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(encodedMessage);
      const signatureBase58 = bs58.encode(signatureBytes);

      // 3. Verify signature on backend
      const verifyRes = await fetch(`${BACKEND_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          signature: signatureBase58,
          message,
        }),
      });

      if (!verifyRes.ok) {
        throw new Error("Signature verification failed");
      }

      const { token } = await verifyRes.json();

      // 4. Store JWT
      localStorage.setItem("relic_token", token);
      return token;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
      return null;
    } finally {
      setIsAuthenticating(false);
    }
  }, [publicKey, signMessage]);

  const signOut = useCallback(() => {
    localStorage.removeItem("relic_token");
  }, []);

  const getToken = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("relic_token");
  }, []);

  return {
    signIn,
    signOut,
    getToken,
    isAuthenticating,
    error,
    isConnected: connected,
  };
}
