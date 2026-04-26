import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';

export const connection = new Connection(
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  'confirmed'
);

const getServerKeypair = () => {
  if (process.env.SERVER_KEYPAIR_SECRET) {
    const secret = Uint8Array.from(JSON.parse(process.env.SERVER_KEYPAIR_SECRET));
    return Keypair.fromSecretKey(secret);
  }
  return Keypair.generate();
};

export const redeemFromReflect = async (reflectVaultRef, ownerKeypair) => {
  console.log(`[Solana] Redeeming from Reflect vault: ${reflectVaultRef}`);
  return { success: true, reflectVaultRef };
};

export const swapToUSDC = async (mintAddress, amount, ownerKeypair) => {
  console.log(`[Solana] Swapping ${amount} of mint ${mintAddress} to USDC`);
  return { success: true, usdcAmount: amount };
};

export const sendToken = async ({ to, amount, mint } = {}) => {
  const recipientAddress = to;
  console.log(`[Solana] Sending ${amount} ${mint || 'SOL'} to ${recipientAddress}`);

  const senderKeypair = getServerKeypair();
  const recipientPubkey = new PublicKey(recipientAddress);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey: recipientPubkey,
      lamports: Math.floor(amount * 1e9),
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
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
      const share =
        (beneficiary.percentage / 100) *
        vault.assets.reduce((sum, a) => sum + a.amount, 0);
      await sendToken({ to: beneficiary.walletAddress, amount: share });
    }
  }

  console.log('[Solana] Execution pipeline complete');
};
