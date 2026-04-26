import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    mintAddress: { type: String },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    encryptedContent: { type: String, required: true },
    recipient: { type: String, required: true },
  },
  { _id: false }
);

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    cdpUrl: { type: String, required: true },
    encryptedKey: { type: String, required: true },
  },
  { _id: false }
);

const vaultSchema = new mongoose.Schema(
  {
    switchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true,
    },
    assets: [assetSchema],
    messages: [messageSchema],
    files: [fileSchema],
    reflectVaultRef: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vault = mongoose.model('Vault', vaultSchema);
export default Vault;
