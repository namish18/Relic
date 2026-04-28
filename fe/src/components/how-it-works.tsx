"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Configure the Engine",
    desc: "Connect your Phantom wallet, configure an inactivity timer, and set up the multi-signature rules using Altitude.",
  },
  {
    num: "02",
    title: "Deposit & Encrypt",
    desc: "Link assets via Reflect vault, and encrypt your private final communications using the Arcium compute network.",
  },
  {
    num: "03",
    title: "Periodic Check-ins",
    desc: "Simply interact or check-in to reset your inactivity timer. Zero-friction confirmation keeps your assets safe.",
  },
  {
    num: "04",
    title: "Grace Period Trigger",
    desc: "If the deadline is reached, a grace period begins triggering multi-channel warnings and a final cancellation window.",
  },
  {
    num: "05",
    title: "Automated Execution",
    desc: "Decrypted data is unlocked and assets are automatically disbursed to beneficiaries' Privy wallets.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-sm font-mono tracking-widest text-primary uppercase mb-4">
              Execution Flow
            </h2>
            <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-foreground mb-6">
              Deterministic. Trustless. <br />
              <span className="font-serif italic font-light text-primary">Inevitable.</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-12">
              From the moment you configure your switch, the protocol acts as an unyielding executor, carrying out your precise programming without intermediaries or delay.
            </p>

            <div className="space-y-12 relative before:absolute before:top-0 before:bottom-0 before:left-6 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative flex items-start"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary bg-background text-primary font-mono font-medium text-sm z-10 shrink-0 mr-6">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium text-foreground mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:block h-full min-h-[600px] border border-border rounded-3xl bg-card overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E0D8_1px,transparent_1px),linear-gradient(to_bottom,#E2E0D8_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2B2A28_1px,transparent_1px),linear-gradient(to_bottom,#2B2A28_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            
            {/* Mockup UI Panel */}
            <div className="absolute inset-12 border border-border/50 rounded-2xl bg-background/50 backdrop-blur-sm flex flex-col p-6 shadow-2xl">
               <div className="flex items-center gap-2 border-b border-border/50 pb-4 mb-4">
                 <div className="w-3 h-3 rounded-full bg-destructive/80" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                 <div className="ml-4 font-mono text-xs text-muted-foreground flex-1 text-center">solana_executor.rs</div>
               </div>
               <div className="flex-1 font-mono text-sm text-foreground/80 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background/50 to-transparent z-10" />
                  <motion.div 
                    animate={{ y: [-200, 0] }} 
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="opacity-70 whitespace-pre text-[11px] leading-relaxed"
                  >
                    {`fn trigger_switch(ctx: Context<TriggerSwitch>) -> Result<()> {
    let switch = &mut ctx.accounts.switch_account;
    let clock = Clock::get()?;

    require!(
        clock.unix_timestamp >= switch.last_checkin + switch.threshold,
        ErrorCode::InactivityThresholdNotMet
    );

    switch.state = SwitchState::Triggered;
    emit!(SwitchTriggered {
        owner: switch.owner,
        timestamp: clock.unix_timestamp,
    });
    
    // Unlock Vault Condition MXE...
    // Transfer Assets via IPC...
    Ok(())
}

fn check_in(ctx: Context<CheckIn>) -> Result<()> {
    let switch = &mut ctx.accounts.switch_account;
    switch.last_checkin = Clock::get()?.unix_timestamp;
    Ok(())
}
`}
                  </motion.div>
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />
               </div>
               
               <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center text-xs font-mono text-muted-foreground">
                 <span>Status: <span className="text-emerald-500">Active</span></span>
                 <span>Latency: 400ms</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
