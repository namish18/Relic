import { Navbar } from "@/components/navbar";
import { Copy, Plus, Activity, AlertCircle, Timer } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-sans tracking-tight text-foreground font-semibold mb-2">
                Your Vault
              </h1>
              <p className="text-muted-foreground">
                Manage your active Relics, monitor timers, and update conditions.
              </p>
            </div>
            <Link
              href="/create"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Switch
            </Link>
          </div>

          {/* Stats / Overview Row */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-none border border-border bg-card">
              <div className="flex items-center gap-3 text-muted-foreground mb-4 font-mono text-sm uppercase">
                <Activity className="w-4 h-4 text-emerald-500" /> System Status
              </div>
              <div className="text-2xl font-medium text-foreground">Secure & Active</div>
            </div>
            <div className="p-6 rounded-none border border-border bg-card">
              <div className="flex items-center gap-3 text-muted-foreground mb-4 font-mono text-sm uppercase">
                <Timer className="w-4 h-4 text-primary" /> Active Switches
              </div>
              <div className="text-2xl font-medium text-foreground">2 Configured</div>
            </div>
            <div className="p-6 rounded-none border border-border bg-card">
              <div className="flex items-center gap-3 text-muted-foreground mb-4 font-mono text-sm uppercase">
                <Copy className="w-4 h-4 text-amber-500" /> Beneficiaries
              </div>
              <div className="text-2xl font-medium text-foreground">5 Assigned</div>
            </div>
          </div>

          <h2 className="font-serif italic text-2xl text-foreground mb-6 border-b border-border/50 pb-4">
            Active Contracts
          </h2>
          
          <div className="grid gap-6">
            {/* Example Switch 1 */}
            <div className="p-6 rounded-none border border-border bg-card hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-medium text-foreground font-sans">Primary Estate</h3>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
                </div>
                <div className="text-muted-foreground text-sm flex items-center gap-4">
                   <span>Allocated: 142.5 SOL, 50k USDC</span>
                   <span className="w-1 h-1 rounded-full bg-border" />
                   <span>3 Beneficiaries</span>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                <div className="text-sm font-mono text-foreground bg-secondary/50 rounded-none px-4 py-3 w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border border-border/50">
                   <span className="text-muted-foreground">Time Left:</span>
                   <span className="text-primary font-medium">89d 14h 22m</span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                   <button className="flex-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-full transition-colors">
                     Check In
                   </button>
                   <Link href="/switch/test_id" className="flex-1 px-4 py-2 border border-border hover:bg-secondary text-foreground text-sm font-medium rounded-full transition-colors text-center">
                     Manage
                   </Link>
                </div>
              </div>
            </div>

            {/* Example Switch 2 */}
            <div className="p-6 rounded-none border border-destructive/20 bg-destructive/5 hover:border-destructive/50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-medium text-foreground font-sans">Emergency Docs</h3>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Warning
                  </span>
                </div>
                <div className="text-muted-foreground text-sm flex items-center gap-4">
                   <span>Allocated: 2 Encrypted Files</span>
                   <span className="w-1 h-1 rounded-full bg-border" />
                   <span>1 Beneficiary</span>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                <div className="text-sm font-mono text-foreground bg-background rounded-none px-4 py-3 w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border border-destructive/20">
                   <span className="text-muted-foreground">Time Left:</span>
                   <span className="text-destructive font-medium animate-pulse">2d 04h 11m</span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                   <button className="flex-1 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm font-medium rounded-full transition-colors shadow-[0_0_15px_rgba(223,88,70,0.3)]">
                     Check In Now
                   </button>
                   <Link href="/switch/test_id_2" className="flex-1 px-4 py-2 border border-border hover:bg-secondary text-foreground text-sm font-medium rounded-full transition-colors text-center bg-card">
                     Manage
                   </Link>
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
