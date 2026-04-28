"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

/**
 * WalletConnect — shows the Solana wallet multi-button.
 * Displays a truncated publicKey when connected.
 * Drop this component anywhere inside the Providers tree.
 */
export default function WalletConnect() {
  const { publicKey } = useWallet();

  return (
    <div className="flex items-center gap-2">
      <WalletMultiButton
        style={{
          height: "32px",
          fontSize: "13px",
          borderRadius: "9999px",
          padding: "0 16px",
          fontWeight: 600,
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      />
      {publicKey && (
        <span
          className="text-xs font-mono text-muted-foreground hidden sm:inline-block"
          title={publicKey.toBase58()}
        >
          {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
        </span>
      )}
    </div>
  );
}
