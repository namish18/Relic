import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const verifySignature = (message, signatureBase58, walletAddress) => {
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = bs58.decode(signatureBase58);
  const publicKeyBytes = new PublicKey(walletAddress).toBytes();
  return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
};

export default verifySignature;
