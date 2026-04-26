import { Navbar } from "@/components/navbar";
import { Copy, Vault, UserCheck, ShieldAlert, Timer, Settings } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function SwitchDetail({ params }: { params: { id: string } }) {
  // In a real app, we'd fetch the data for `params.id` here
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <Link href="/dashboard/owner" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block transition-colors">
              &larr; Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-sans tracking-tight text-foreground font-semibold flex items-center gap-3">
                  Primary Estate 
                  <span className="px-2.5 py-0.5 rounded-full text-xs uppercase font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">Active</span>
                </h1>
                <p className="text-xs font-mono text-muted-foreground mt-2">Contract ID: 8xF3g...9a21</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-full text-sm hover:-translate-y-0.5 transition-transform shadow-sm">
                  Check In Now
                </button>
                <button className="px-4 py-2.5 border border-border bg-card font-medium rounded-full text-sm hover:bg-secondary transition-colors text-foreground flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-3xl border border-border bg-card col-span-2">
              <h3 className="font-serif italic text-xl mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                <Timer className="w-5 h-5 text-primary not-italic" /> Status & Engine
              </h3>
              <div className="flex flex-col gap-6 mt-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Time until Trigger</div>
                  <div className="text-3xl font-mono text-foreground font-light">
                    89<span className="text-muted-foreground text-sm space-x-1 uppercase mr-2">d</span>
                    14<span className="text-muted-foreground text-sm uppercase mr-2">h</span>
                    22<span className="text-muted-foreground text-sm uppercase mr-2">m</span>
                    10<span className="text-muted-foreground text-sm uppercase">s</span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[25%] rounded-full shadow-[0_0_10px_rgba(207,166,94,0.5)]"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>Last Check-In: 10/12/2026</span>
                  <span>Trigger: 01/10/2027</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-border bg-card">
               <h3 className="font-serif italic text-xl mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                <UserCheck className="w-5 h-5 text-amber-500 not-italic" /> Beneficiaries
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center justify-between">
                  <div className="font-medium text-sm text-foreground">Aria Vance</div>
                  <div className="text-xs font-mono text-muted-foreground">50%</div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="font-medium text-sm text-foreground">Dev Corp</div>
                  <div className="text-xs font-mono text-muted-foreground">25%</div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="font-medium text-sm text-foreground">Charity Wallet</div>
                  <div className="text-xs font-mono text-muted-foreground">25%</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-border bg-card">
              <h3 className="font-serif italic text-xl mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                <Copy className="w-5 h-5 text-emerald-500 not-italic" /> Financial Assets
              </h3>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-[10px]">SOL</div>
                     <span className="font-medium text-sm">Solana</span>
                   </div>
                   <span className="font-mono text-sm">142.5</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-[10px]">$</div>
                     <span className="font-medium text-sm">USDC</span>
                   </div>
                   <span className="font-mono text-sm">50,000.00</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-border bg-card relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <ShieldAlert className="w-48 h-48" />
              </div>
              <h3 className="font-serif italic text-xl mb-4 flex items-center gap-2 border-b border-border/50 pb-2 relative z-10">
                <Vault className="w-5 h-5 text-primary not-italic" /> Encrypted Vault
              </h3>
              <div className="space-y-4 mt-6 relative z-10">
                <div className="p-4 bg-background border border-border rounded-lg text-sm text-muted-foreground flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Final Letters (3 items)</h4>
                    <p className="text-xs">End-to-end encrypted. Status: Locked until execution.</p>
                  </div>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg text-sm text-muted-foreground flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Recovery Keys</h4>
                    <p className="text-xs">PDF Document. Status: Locked until execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
