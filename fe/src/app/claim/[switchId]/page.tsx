"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Link2, ShieldCheck, Wallet, Copy, Check, ArrowRight, Loader2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function ClaimSwitchPage() {
  const { switchId } = useParams<{ switchId: string }>();
  const {
    isAuthenticated,
    isLoading,
    walletAddress,
    email,
    login,
    getAccessToken,
  } = usePrivyAuth();

  const [claimStatus, setClaimStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [claimError, setClaimError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const MAX_RETRIES = 3;

  const handleCopy = useCallback(() => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [walletAddress]);

  const attemptRegister = useCallback(async (retryCount: number): Promise<void> => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Could not get Privy access token. Please re-login.");
    }

    const res = await fetch(
      `${BACKEND_URL}/claim/register/${switchId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ walletAddress }),
      }
    );

    // 202 = wallet still being provisioned by Privy — auto-retry
    if (res.status === 202) {
      if (retryCount >= MAX_RETRIES) {
        throw new Error(
          "Wallet provisioning is taking longer than expected. Please wait a moment and try again."
        );
      }
      const data = await res.json().catch(() => ({}));
      const delay = (data.retryAfter || 3) * 1000;
      setRetryAttempt(retryCount + 1);
      await new Promise((r) => setTimeout(r, delay));
      return attemptRegister(retryCount + 1);
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Claim registration failed");
    }
  }, [walletAddress, switchId, getAccessToken]);

  const handleRegisterClaim = useCallback(async () => {
    if (!walletAddress) return;

    setClaimStatus("loading");
    setClaimError(null);
    setRetryAttempt(0);

    try {
      await attemptRegister(0);
      setClaimStatus("success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong";
      setClaimError(msg);
      setClaimStatus("error");
    } finally {
      setRetryAttempt(0);
    }
  }, [walletAddress, attemptRegister]);

  // ── Loading state ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <main className="flex-1 flex items-center justify-center w-full px-6 py-20">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-2xl relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/10" />
              <Link2 className="w-8 h-8" />
            </div>
          </div>

          {/* ── Not authenticated ── */}
          {!isAuthenticated && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif italic text-foreground mb-2">
                  Notice of Transfer
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You have been mathematically verified as a beneficiary for an
                  enacted Relic contract.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-background border border-border rounded-2xl">
                  <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-1">
                    Switch ID
                  </div>
                  <div className="font-medium text-sm truncate font-mono">
                    {switchId}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background border border-border rounded-2xl flex flex-col items-center justify-center text-center">
                    <Wallet className="w-5 h-5 text-emerald-500 mb-2" />
                    <div className="font-medium text-sm">Financial Assets</div>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-2xl flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
                    <div className="font-medium text-sm">Encrypted Data</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => login()}
                className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full shadow-sm transition-colors text-center flex items-center justify-center gap-2"
              >
                Claim Your Inheritance
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                This process is gas-less. Authentication via Privy will instantly
                provision your target wallet.
              </p>
            </>
          )}

          {/* ── Authenticated — show wallet + register claim ── */}
          {isAuthenticated && claimStatus !== "success" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif italic text-foreground mb-2">
                  Your Claim Wallet
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {email
                    ? `Signed in as ${email}`
                    : "Authenticated via Privy"}
                </p>
              </div>

              {/* Wallet address */}
              <div className="p-4 bg-background border border-border rounded-2xl mb-6">
                <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-2">
                  Solana Wallet (auto-provisioned)
                </div>
                {walletAddress ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-foreground truncate flex-1">
                      {walletAddress}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Provisioning wallet…
                  </div>
                )}
              </div>

              {/* Error state */}
              {claimError && (
                <div className="p-3 mb-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {claimError}
                </div>
              )}

              {/* Register claim button */}
              <button
                onClick={handleRegisterClaim}
                disabled={!walletAddress || claimStatus === "loading"}
                className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {claimStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {retryAttempt > 0
                      ? `Creating your wallet… (attempt ${retryAttempt}/${MAX_RETRIES})`
                      : "Registering…"}
                  </>
                ) : (
                  <>
                    Register My Claim
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          )}

          {/* ── Success state ── */}
          {claimStatus === "success" && (
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Check className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-serif italic text-foreground mb-2">
                Claim Registered
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Your claim has been recorded. Assets will arrive in your Solana
                wallet when the switch triggers.
              </p>
              <div className="p-3 bg-background border border-border rounded-xl">
                <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-1">
                  Receiving Wallet
                </div>
                <div className="font-mono text-xs text-foreground truncate">
                  {walletAddress}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
