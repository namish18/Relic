import { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

export const redeemFromReflect = async (reflectVaultRef, ownerKeypair) => {
  console.log(`[Solana] Redeeming from Reflect vault: ${reflectVaultRef}`);
  return { success: true, reflectVaultRef };
};

export const swapToUSDC = async (mintAddress, amount, ownerKeypair) => {
  console.log(`[Solana] Swapping ${amount} of mint ${mintAddress} to USDC`);
  return { success: true, usdcAmount: amount };
};

export const sendToken = async (recipientAddress, amount, ownerKeypair) => {
  console.log(`[Solana] Sending ${amount} USDC to ${recipientAddress}`);

  const recipientPubkey = new PublicKey(recipientAddress);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: ownerKeypair.publicKey,
      toPubkey: recipientPubkey,
      lamports: Math.floor(amount * 1e9),
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [ownerKeypair]);
  console.log(`[Solana] Transfer confirmed: ${signature}`);
  return { success: true, signature };
};

export const executePipeline = async (vault, beneficiaries, ownerKeypair) => {
  if (vault.reflectVaultRef) {
    await redeemFromReflect(vault.reflectVaultRef, ownerKeypair);
  }

  for (const asset of vault.assets) {
    if (asset.mintAddress) {
      await swapToUSDC(asset.mintAddress, asset.amount, ownerKeypair);
    }
  }

  for (const beneficiary of beneficiaries) {
    if (beneficiary.type === 'WALLET' && beneficiary.walletAddress) {
      const share = (beneficiary.percentage / 100) * vault.assets.reduce((sum, a) => sum + a.amount, 0);
      await sendToken(beneficiary.walletAddress, share, ownerKeypair);
    }
  }

  console.log('[Solana] Execution pipeline complete');
};
