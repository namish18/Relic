# ☠ Relic
### The World's First Programmable Digital Will on Solana
**Version 2.0 — Colosseum Frontier Hackathon 2026**

---

[![Solana](https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/)
[![Anchor](https://img.shields.io/badge/Anchor-000000?style=for-the-badge&logo=anchor&logoColor=white)](https://www.anchor-lang.com/)
[![Phantom](https://img.shields.io/badge/Phantom-512DA8?style=for-the-badge&logo=phantom&logoColor=white)](https://phantom.app/)

## 1. Executive Summary
Every day, digital assets are lost to the "inheritance gap." Over **$140 billion** in Bitcoin has been permanently lost because owners died without sharing access. Crypto wallets, encrypted files, and final messages vanish forever — not because of theft, but because no system existed to pass them on.

**Relic** is a smart-contract-powered dead man's switch on Solana. Users set an inactivity timer and designate beneficiaries. If the owner stops checking in, everything they configured — assets, encrypted messages, private files — automatically transfers to exactly the people they chose.

**No lawyers, no courts, no middlemen. Just code that keeps its promise forever.**

---

## 2. Sponsor Integration Map (Frontier 2026)
Relic is built to leverage the full power of the Colosseum Frontier sponsors, maximizing bounty eligibility and demonstrating deep integration.

| Sponsor | Role in Relic | Replaces / Upgrades |
| :--- | :--- | :--- |
| **Phantom** | Primary Wallet Auth (SIWS), Check-in signing, Transaction gateway. | Generic wallet connect. |
| **Altitude** | Multi-sig treasury for holding execution instructions. | Plain EOA transfer (eliminates single point of failure). |
| **Arcium** | Encrypted computation (MXE) for message vault & key management. | Lit Protocol (MPC-based conditional decryption). |
| **Privy** | Email-based embedded wallets for non-crypto beneficiaries. | Complex seed phrase onboarding. |
| **Metaplex** | NFT detection, cNFT transfers, and Inheritance Certificates. | Generic SPL transfers. |
| **MoonPay** | Fiat on-ramp for gas fees; Fiat off-ramp for legacy conversion. | The "I don't have SOL for gas" blocker. |
| **Coinbase** | CDP (Cloud Developer Platform) for encrypted file storage. | Unreliable public IPFS gateways. |
| **Reflect** | Yield vault: Idle SOL/USDC earns yield until the trigger fires. | Zero-yield pending state. |
| **Raydium** | Liquidity swap: Auto-swaps obscure tokens to USDC before delivery. | Receiving illiquid/worthless tokens. |
| **World** | Humanity proof: World ID verification for high-value switches. | Sybil-resistance for proof-of-life. |

---

## 3. The Problem: The Digital Inheritance Gap
The global legal system was not designed for the blockchain. When a crypto holder passes:
- **Inaccessible Wallets:** No lawyer can retrieve a private key from the void.
- **Locked Assets:** SPL tokens, NFTs, and stablecoins remain frozen on-chain.
- **Lost Secrets:** Encrypted files and passwords become permanently unrecoverable.
- **Silent Farewells:** Final messages to family are never delivered.

---

## 4. Product Overview & Mechanics
Relic operates on a simple, powerful mechanic:
1. **Initialize:** Connect Phantom and create a "Relic Switch."
2. **Configure:** Set an inactivity timer (30–365 days) and designate beneficiaries.
3. **Yield:** Idle assets are placed in **Reflect** yield vaults, earning while the user is active.
4. **Validation:** On-chain check-ins (verified by **World ID**) reset the timer.
5. **Execution:** If the deadline is missed, the **Altitude** multi-sig executor fires, **Raydium** swaps assets if needed, **Arcium** unlocks messages, and **Privy** delivers everything to the beneficiary's email-linked wallet.

---

## 5. Technical Architecture

```mermaid
graph TD
    User((User)) -->|SIWS| Phantom[Phantom Wallet]
    Phantom -->|Check-in| SC[Relic Smart Contract]
    SC -->|Idle Assets| Reflect[Reflect Yield Vault]
    
    subgraph Trigger Phase
        Crank[Crank Process] -->|Deadline Passed| SC
        SC -->|48h Timelock| Altitude[Altitude Multi-Sig]
    end
    
    subgraph Execution Phase
        Altitude -->|Execute| SC
        SC -->|Swap| Raydium[Raydium Swap]
        SC -->|Unlock| Arcium[Arcium MXE]
        SC -->|Transfer| Metaplex[Metaplex NFT/cNFT]
    end
    
    subgraph Delivery Phase
        Arcium -->|Decrypted Msg| Portal[Beneficiary Portal]
        Raydium -->|USDC| Portal
        Metaplex -->|NFTs| Portal
        Portal -->|Email Auth| Privy[Privy Embedded Wallet]
        Privy -->|Gas| MoonPay[MoonPay On-ramp]
        Portal -->|Files| Coinbase[Coinbase CDP Storage]
    end
```

---

## 6. Feature Specifications

### 6.1 Core Switch Engine (Phantom + Altitude)
- **SIWS Auth:** Secure login via Phantom without passwords.
- **Altitude Multi-Sig:** Execution rights held by a multi-sig to prevent single-point-of-failure triggers.
- **One-Click Check-in:** Phantom-signed instruction resets the clock in < 2 seconds.

### 6.2 Encrypted Message Vault (Arcium)
- **MPC Decryption:** Keys are only released by Arcium's MXE when the on-chain switch triggers.
- **Multi-Recipient:** Independently encrypted secrets for each designated beneficiary.

### 6.3 Asset Lifecycle (Reflect + Raydium + Metaplex)
- **Yield While You Wait:** Assets earn 5%+ APY via Reflect USDC+ until execution.
- **Token Liquidation:** Auto-swap illiquid tokens to USDC via Raydium to ensure beneficiaries receive value.
- **NFT Inheritance:** Automated transfer of Metaplex assets and cNFTs.

### 6.4 Beneficiary Experience (Privy + MoonPay)
- **Zero-Friction:** Claims via email-linked Privy wallets—no crypto knowledge required.
- **Gas Abstraction:** MoonPay allows beneficiaries to cover gas fees with a credit card.



---

## 7. Dashboard Architecture & User Experience

 **KEY UX INSIGHT:** 
- **Owner Dashboard = Control + Safety**
- **Beneficiary Dashboard = Simplicity + Emotion**

### 7.1 Owner Dashboard (Primary App Experience)
*The core control panel of Relic, aligned with switch management, check-in, vault, and beneficiaries.*

**A. Dashboard Overview (Top Section)**
- **Global Status Card:** Instant status indicating safety (Active /  Warning /  Triggered).
- **Next Trigger Countdown:** Live timer based on `triggerAt`.
- **Last Check-in:** Timestamp of the last interaction.
- **Quick Actions:** Primary Check-in button and "Create new switch".

**B. Switch List (Core Section)**
- Each switch is presented as a card containing:
  - **Status badge:** ACTIVE / WARNING / TRIGGERED / EXECUTING / COMPLETED
  - **Countdown:** Time until expiration.
  - **Assets & Vault Summary:** Snapshot of secured assets and vault contents.
  - **Quick Actions:** View Details, Edit, Cancel.

**C. Switch Detail View**
- **Status + Timeline:** Visual progression from Created → Active → Warning → Triggered → Executed.
- **Beneficiaries Section:** List of assigned beneficiaries with percentage splits and claim status.
- **Assets Section:** Breakdown of SOL, USDC, SPL tokens, and NFTs with estimated USD value.
- **Message Vault:** Encrypted text, audio, or video messages locked until execution.
- **File Vault:** Encrypted documents and files.
- **Controls:** Ability to update beneficiaries, timer, or execute an emergency override within a 48h window.

### 7.2 Beneficiary Dashboard (Claim Experience)
*An emotional and simplified UX aligned with Privy onboarding to seamlessly claim and unlock inherited assets.*

**A. Welcome / Claim Status**
- Indicates the state of the inheritance: Pending Claim, Claimed, or Processing.

**B. Assets Received (The Core Delivery)**
- Displays total fiat-equivalent value and a breakdown of received crypto assets and NFTs.

**C. Claim Action**
- Primary call to action to trigger `/claim/redeem` and unlock the smart contract distribution.

**D. Secured Messages & Files (The Emotional Hook)**
- Upon claiming, the interface decrypts and plays final voice notes, video messages, and allows downloading of secured documents (passwords, photos).

**E. Off-Ramping (MoonPay)**
- Integrated actions to easily "Withdraw to bank" via MoonPay or send to another wallet, catering to non-crypto natives.

### 7.3 State-Based UI Mapping
**Owner States:**
- `ACTIVE`: Green UI, ticking countdown.
- `WARNING`: Yellow alerts, urging a check-in.
- `TRIGGERED`: Red UI, locked for editing (48h emergency timelock).
- `EXECUTING`: Processing state.
- `COMPLETED`: Fully locked, post-execution.

**Beneficiary States:**
- `BEFORE CLAIM`: Call-to-action focused.
- `CLAIMING`: Loading state.
- `CLAIMED`: Vault unlocked, assets displayed.

### 7.4 Data Contract (API Architecture)
**Owner Dashboard API Response:**
```json
{
  "switches": [
    {
      "id": "123",
      "name": "Main Will",
      "status": "ACTIVE",
      "timeLeft": 86400000,
      "assets": { "sol": 2.5, "usdc": 100 },
      "beneficiariesCount": 2,
      "messagesCount": 3,
      "filesCount": 2
    }
  ]
}
```

**Beneficiary Dashboard API Response:**
```json
{
  "inheritances": [
    {
      "switchId": "123",
      "status": "PENDING",
      "totalValue": 1200,
      "assets": [
        { "type": "SOL", "amount": 1.5 },
        { "type": "USDC", "amount": 500 }
      ],
      "hasClaimed": false,
      "messages": [],
      "files": []
    }
  ]
}
```

---

> "Relic addresses a fundamental gap in the blockchain ecosystem: digital inheritance. It transforms blockchain from a system of ownership into a system of continuity."

