"use client";

import { useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";

const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || "11111111111111111111111111111111"
);

/**
 * Hook for interacting with the Relic on-chain program.
 *
 * Provides helpers for the core Anchor instructions:
 *  - createSwitch()
 *  - checkIn()
 *  - cancelSwitch()
 *
 * NOTE: Replace the instruction data construction with actual Anchor IDL
 * discriminators once the program IDL is available. The current
 * implementation uses Anchor-style 8-byte discriminators derived from
 * the instruction name.
 */
export function useRelic() {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();

  /** Derive a PDA for the user's switch account. */
  const switchPDA = useMemo(() => {
    if (!publicKey) return null;
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("switch"), publicKey.toBuffer()],
      PROGRAM_ID
    );
    return pda;
  }, [publicKey]);

  // ── Anchor-style 8-byte discriminator (sha256("global:<name>")[0..8]) ──
  const getDiscriminator = useCallback(async (name: string) => {
    const msgBuffer = new TextEncoder().encode(`global:${name}`);
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      msgBuffer.buffer as ArrayBuffer
    );
    return new Uint8Array(hashBuffer).slice(0, 8);
  }, []);

  /**
   * Create a new dead-man's switch on-chain.
   * @param timeoutSeconds – inactivity timeout before the switch triggers
   */
  const createSwitch = useCallback(
    async (timeoutSeconds: number) => {
      if (!publicKey || !switchPDA) throw new Error("Wallet not connected");

      const discriminator = await getDiscriminator("create_switch");
      // Encode timeout as little-endian i64
      const data = Buffer.alloc(8 + 8);
      data.set(discriminator, 0);
      data.writeBigInt64LE(BigInt(timeoutSeconds), 8);

      const ix = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: switchPDA, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: PROGRAM_ID,
        data,
      });

      const tx = new Transaction().add(ix);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");
      return signature;
    },
    [publicKey, switchPDA, connection, sendTransaction, getDiscriminator]
  );

  /**
   * Check-in to reset the inactivity timer.
   */
  const checkIn = useCallback(async () => {
    if (!publicKey || !switchPDA) throw new Error("Wallet not connected");

    const discriminator = await getDiscriminator("check_in");
    const data = Buffer.from(discriminator);

    const ix = new TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: switchPDA, isSigner: false, isWritable: true },
      ],
      programId: PROGRAM_ID,
      data,
    });

    const tx = new Transaction().add(ix);
    const signature = await sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");
    return signature;
  }, [publicKey, switchPDA, connection, sendTransaction, getDiscriminator]);

  /**
   * Cancel an existing switch and reclaim lamports.
   */
  const cancelSwitch = useCallback(async () => {
    if (!publicKey || !switchPDA) throw new Error("Wallet not connected");

    const discriminator = await getDiscriminator("cancel_switch");
    const data = Buffer.from(discriminator);

    const ix = new TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: switchPDA, isSigner: false, isWritable: true },
      ],
      programId: PROGRAM_ID,
      data,
    });

    const tx = new Transaction().add(ix);
    const signature = await sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");
    return signature;
  }, [publicKey, switchPDA, connection, sendTransaction, getDiscriminator]);

  return {
    publicKey,
    switchPDA,
    createSwitch,
    checkIn,
    cancelSwitch,
    connected: !!publicKey,
  };
}
