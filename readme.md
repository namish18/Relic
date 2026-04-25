Relic

The World's First Programmable Digital Will on Solana

Overview

Relic is a smart contract–powered digital inheritance protocol built on Solana. It enables users to securely transfer digital assets, encrypted messages, and sensitive files to designated beneficiaries in the event of prolonged inactivity.

By combining decentralized infrastructure with programmable execution, Relic eliminates reliance on legal intermediaries and ensures that digital ownership is preserved beyond the lifetime of the user.

Problem Statement

Digital assets lack a native inheritance mechanism. When a crypto holder dies:

Private keys are lost permanently
Assets become inaccessible on-chain
Encrypted files and credentials are unrecoverable
Final communications are never delivered

An estimated $140+ billion in crypto assets is permanently lost due to this gap.

Solution

Relic introduces a programmable “dead man’s switch”:

Users configure an inactivity timer and beneficiaries
Assets, messages, and files are securely linked to the switch
Regular check-ins reset the timer
If inactivity persists beyond the threshold:
The system automatically triggers execution
Assets are transferred
Messages and files are decrypted and delivered

This process is fully decentralized, deterministic, and trustless.

Key Features
1. Core Switch Engine
Configurable inactivity timers (30–365 days)
On-chain check-in mechanism
Multi-beneficiary support
Update and cancellation functionality
2. Encrypted Message Vault
Client-side encryption
Conditional decryption triggered on-chain
Multi-recipient secure delivery
Supports text, media, and attachments
3. Asset Transfer System
Automatic token transfer upon trigger
NFT inheritance handling
Token normalization (swap to stable assets when required)
Yield generation on idle assets (optional)
4. Beneficiary Experience
Email-based onboarding for non-crypto users
Instant wallet creation
Gas fee assistance
Fiat off-ramp support
5. Secure File Storage
Encrypted storage of sensitive documents
Controlled access via cryptographic conditions
High-reliability storage layer
6. Proof-of-Life Mechanism
Activity-based validation
Multi-channel warning system
Optional human verification layer
Emergency cancellation window
System Architecture
Technology Stack
Layer	Technology
Blockchain	Solana (Anchor Framework)
Frontend	Next.js, Tailwind CSS
Wallet & Auth	Phantom (SIWS)
Multi-Signature	Altitude
Encrypted Compute	Arcium
Beneficiary Wallets	Privy
NFT Infrastructure	Metaplex
Token Liquidity	Raydium
Yield Layer	Reflect
Fiat Integration	MoonPay, Coinbase
Storage	Coinbase CDP
Identity Verification	World ID
Smart Contract Design
Core Accounts
SwitchAccount
Stores owner, inactivity threshold, state, and timestamps
BeneficiaryAccount
Stores recipients, allocation logic, and verification data
VaultAccount
References encrypted data and asset configurations
ExecutorProgram
Handles trigger execution and asset distribution
Core Instructions
check_in() — Resets inactivity timer
trigger_switch() — Initiates execution after deadline
execute_transfer() — Transfers assets and unlocks data
cancel_switch() — Cancels within grace period
update_beneficiaries() — Modifies recipients
Execution Flow
Inactivity deadline is reached
Trigger state is activated on-chain
Grace period begins with warnings
Multi-signature authorization executes the switch
Assets are redeemed and normalized
Encrypted data is unlocked
Assets and data are delivered to beneficiaries
Proof of transfer is recorded on-chain
User Flows
Owner Flow
Connect wallet
Configure switch parameters
Upload assets, messages, and files
Perform periodic check-ins
Beneficiary Flow
Receive notification
Access claim portal
Create or connect wallet
Receive assets and decrypted data
Optionally convert to fiat
Goals
Hackathon Objectives
Deliver a working end-to-end MVP
Demonstrate complete trigger-to-claim pipeline
Integrate all sponsor technologies
Achieve production-level reliability on devnet
Success Metrics
100% successful switch execution
Sub-2-second check-in latency
Zero-friction beneficiary onboarding
Full integration coverage
Innovation
First programmable digital will on Solana
Fully non-custodial inheritance system
Combines cryptography, smart contracts, and automation
Enables cross-generational transfer of digital ownership
Risks and Mitigation
Risk	Mitigation Strategy
Integration complexity	Modular architecture and staged development
Scope constraints	MVP prioritization
Dependency availability	Fallback infrastructure options
UX for non-crypto users	Abstracted onboarding and fiat integration
Future Scope
Multi-chain support
Mobile applications
Legal integration layers
DAO-based governance
Advanced automation policies
Conclusion

Relic addresses a fundamental gap in the blockchain ecosystem: digital inheritance. By leveraging decentralized technologies and programmable execution, it ensures that digital assets, memories, and information are never lost due to inaccessibility.

It transforms blockchain from a system of ownership into a system of continuity.

Tagline

“Code that keeps its promise forever.”





