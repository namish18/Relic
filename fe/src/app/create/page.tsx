import { Navbar } from "@/components/navbar";
import { ArrowRight, FileLock2, Link as LinkIcon, ShieldCheck, Timer } from "lucide-react";
import Link from "next/link";

export default function CreateWizard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block transition-colors">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-4xl font-sans tracking-tight text-foreground font-semibold">
              Create a New Switch
            </h1>
          </div>

          <div className="grid md:grid-cols-[250px_1fr] gap-12">
            {/* Sidebar Steps */}
            <aside className="hidden md:block border-r border-border/50 pr-6">
              <nav className="space-y-6">
                <div className="flex items-start gap-4 flex-col text-sm font-medium">
                  <div className="text-primary flex items-center gap-3 w-full">
                    <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-xs">1</span>
                    Timer Configuration
                  </div>
                  <div className="text-muted-foreground flex items-center gap-3 w-full">
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">2</span>
                    Beneficiaries
                  </div>
                  <div className="text-muted-foreground flex items-center gap-3 w-full">
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">3</span>
                    Asset Selection
                  </div>
                  <div className="text-muted-foreground flex items-center gap-3 w-full">
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">4</span>
                    Message Vault
                  </div>
                  <div className="text-muted-foreground flex items-center gap-3 w-full">
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">5</span>
                    Confirmation
                  </div>
                </div>
              </nav>
            </aside>

            {/* Step Content Content */}
            <div className="bg-card border border-border rounded-none p-5 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-medium font-sans mb-2 flex items-center gap-3">
                 <Timer className="w-6 h-6 text-primary" /> Step 1: Inactivity Timer
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                 Configure how long the smart contract should wait before assuming inactivity and triggering the execution pipeline.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">Select Threshold</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                     <button className="px-4 py-3 rounded-full border border-border hover:border-primary/50 bg-background text-sm font-medium transition-colors">30 Days</button>
                     <button className="px-4 py-3 rounded-full border-2 border-primary bg-primary/5 text-primary text-sm font-medium transition-colors">90 Days</button>
                     <button className="px-4 py-3 rounded-full border border-border hover:border-primary/50 bg-background text-sm font-medium transition-colors">180 Days</button>
                     <button className="px-4 py-3 rounded-full border border-border hover:border-primary/50 bg-background text-sm font-medium transition-colors">365 Days</button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Custom intervals available with Arcium premium.</p>
                </div>

                <div className="p-4 bg-secondary/50 rounded-none border border-border/50">
                   <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Multi-channel Grace Period</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                           A 7-day warning period is automatically appended before actual execution. During this period, you will be notified via SMS and Email to cancel the switch if triggered accidentally.
                        </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-border flex justify-between items-center">
                 <button className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                   Cancel
                 </button>
                 <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium group flex items-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm">
                   Next Step <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
