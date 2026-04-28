"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

/**
 * Dashboard layout guard.
 * Redirects to / if the wallet is not connected AND there is no
 * relic_token stored in localStorage.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("relic_token");
    if (!connected && !token) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [connected, router]);

  // Avoid flash of protected content before redirect
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
