"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import DotGrid from "@/components/DotGrid";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Timer,
  Users,
  Wallet,
  MessageSquare,
  CheckCircle2,
  Plus,
  Trash2,
  FileLock2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, label: "Timer Config", icon: Timer },
  { id: 2, label: "Beneficiaries", icon: Users },
  { id: 3, label: "Assets", icon: Wallet },
  { id: 4, label: "Message Vault", icon: MessageSquare },
  { id: 5, label: "Confirmation", icon: CheckCircle2 },
];

export default function CreateWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState(90);
  const [beneficiaries, setBeneficiaries] = useState([
    { email: "", split: 100 },
  ]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(["sol"]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const addBeneficiary = () =>
    setBeneficiaries((b) => [...b, { email: "", split: 0 }]);
  const removeBeneficiary = (i: number) =>
    setBeneficiaries((b) => b.filter((_, idx) => idx !== i));
  const updateBeneficiary = (
    i: number,
    field: "email" | "split",
    value: string | number
  ) =>
    setBeneficiaries((b) =>
      b.map((ben, idx) => (idx === i ? { ...ben, [field]: value } : ben))
    );

  const toggleAsset = (asset: string) =>
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* DotGrid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] dark:opacity-65">
        <DotGrid
          dotSize={4}
          gap={24}
          baseColor="#3D2E0E"
          activeColor="#D4AF67"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/dashboard/owner"
              className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-sans tracking-tight text-foreground font-semibold">
              Create a New Switch
            </h1>
            <p className="text-muted-foreground mt-2">
              Configure your programmable digital will on Solana.
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="flex items-center gap-0 mb-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isDone = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDone
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-muted-foreground bg-background"
                        }`}
                    >
                      {isDone ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-medium hidden sm:block ${isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${currentStep > step.id ? "bg-primary" : "bg-border"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm">

            {/* STEP 1: Timer */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                  <Timer className="w-6 h-6 text-primary" /> Step 1: Inactivity Timer
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Configure how long the smart contract should wait before assuming inactivity and triggering the execution pipeline.
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-foreground">
                      Select Threshold
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      {[30, 90, 180, 365].map((days) => (
                        <button
                          key={days}
                          onClick={() => setSelectedDays(days)}
                          className={`px-4 py-3 rounded-full border-2 text-sm font-medium transition-all ${selectedDays === days
                            ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,103,0.15)]"
                            : "border-border hover:border-primary/50 bg-background text-foreground"
                            }`}
                        >
                          {days} Days
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Custom intervals available with Arcium premium.
                    </p>
                  </div>
                  <div className="p-5 bg-secondary/50 rounded-2xl border border-border/50">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          Multi-channel Grace Period
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          A 7-day warning period is automatically appended before actual execution. During this period, you will be notified via SMS and Email to cancel the switch if triggered accidentally.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Beneficiaries */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" /> Step 2: Beneficiaries
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Add the people who will receive your assets. They will be onboarded via Privy with just their email address.
                </p>
                <div className="space-y-4">
                  {beneficiaries.map((ben, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 bg-secondary/30 rounded-2xl border border-border/50"
                    >
                      <div className="flex-1 space-y-3">
                        <input
                          type="email"
                          placeholder="beneficiary@email.com"
                          value={ben.email}
                          onChange={(e) => updateBeneficiary(i, "email", e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={ben.split}
                          onChange={(e) => updateBeneficiary(i, "split", Number(e.target.value))}
                          className="w-20 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-primary transition-colors"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                        {beneficiaries.length > 1 && (
                          <button
                            onClick={() => removeBeneficiary(i)}
                            className="p-2 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addBeneficiary}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-dashed border-border hover:border-primary/50 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
                  >
                    <Plus className="w-4 h-4" /> Add Beneficiary
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Total split must equal 100%. Remaining:{" "}
                    <span className={beneficiaries.reduce((s, b) => s + Number(b.split), 0) === 100 ? "text-emerald-500" : "text-amber-500"}>
                      {100 - beneficiaries.reduce((s, b) => s + Number(b.split), 0)}%
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Assets */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-primary" /> Step 3: Asset Selection
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Select which assets from your connected Phantom wallet should be included in this switch.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "sol", label: "Solana (SOL)", balance: "142.5 SOL", value: "$21,375" },
                    { id: "usdc", label: "USDC", balance: "50,000 USDC", value: "$50,000" },
                    { id: "nft1", label: "Mad Lads #4421", balance: "1 NFT", value: "~$1,200" },
                    { id: "nft2", label: "Okay Bears #882", balance: "1 NFT", value: "~$800" },
                  ].map((asset) => {
                    const isSelected = selectedAssets.includes(asset.id);
                    return (
                      <button
                        key={asset.id}
                        onClick={() => toggleAsset(asset.id)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(212,175,103,0.1)]"
                          : "border-border bg-background hover:border-primary/40"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground text-sm">{asset.label}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-primary bg-primary" : "border-border"}`}>
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{asset.balance}</p>
                        <p className="text-xs text-primary font-mono mt-1">{asset.value}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Assets are held in your Phantom wallet until the switch is triggered. No custody transfer occurs during setup.
                </p>
              </div>
            )}

            {/* STEP 4: Message Vault */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                  <FileLock2 className="w-6 h-6 text-primary" /> Step 4: Message Vault
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Leave an encrypted message for your beneficiaries. This will be locked using Arcium's MXE compute network and only unlocked upon switch execution.
                </p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Final Message (Optional)
                    </label>
                    <textarea
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message to your beneficiaries. This is encrypted end-to-end and only readable after the switch is executed..."
                      className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <div className="p-5 bg-secondary/50 rounded-2xl border border-border/50 flex items-start gap-3">
                    <FileLock2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Arcium Encrypted Compute</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Your message is encrypted client-side before leaving your browser. Not even the <span className="font-relic tracking-wide font-normal">Relic</span> protocol can read it. It is unlocked only via on-chain execution through a Multi-Party Execution (MXE) computation.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    File attachments (audio, video, documents) can be added after switch creation.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: Confirmation */}
            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" /> Step 5: Confirm & Deploy
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Review your configuration before deploying to Solana Devnet. This action will create an on-chain smart contract.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      label: "Inactivity Timer",
                      value: `${selectedDays} days`,
                      sub: "+ 7-day grace period",
                    },
                    {
                      label: "Beneficiaries",
                      value: `${beneficiaries.filter((b) => b.email).length} configured`,
                      sub: beneficiaries
                        .filter((b) => b.email)
                        .map((b) => `${b.email} (${b.split}%)`)
                        .join(", ") || "None added",
                    },
                    {
                      label: "Assets",
                      value: `${selectedAssets.length} selected`,
                      sub: selectedAssets.join(", ").toUpperCase(),
                    },
                    {
                      label: "Message Vault",
                      value: message ? "1 message" : "No message",
                      sub: message ? "Encrypted via Arcium" : "Optional — can be added later",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between p-4 bg-secondary/30 rounded-2xl border border-border/50"
                    >
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By confirming, you authorize <span className="font-relic tracking-wide font-normal">Relic</span> to deploy a smart contract to Solana Devnet via your connected Phantom wallet. A small gas fee (~0.005 SOL) will be charged.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
              <button
                onClick={currentStep === 1 ? () => router.push("/dashboard/owner") : goBack}
                className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? "Cancel" : "Back"}
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={goNext}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium group flex items-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm shadow-primary/30"
                >
                  Next Step{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => router.push("/dashboard/owner")}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium group flex items-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm shadow-primary/30"
                >
                  <CheckCircle2 className="w-4 h-4" /> Deploy Switch
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
