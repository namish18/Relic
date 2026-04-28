import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema(
  {
    switchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true,
    },
    type: {
      type: String,
      enum: ['WALLET', 'EMAIL'],
      required: true,
    },
    walletAddress: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    encryptedData: {
      type: String,
    },
    hasClaimed: {
      type: Boolean,
      default: false,
    },
    privyUserId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);
export default Beneficiary;
