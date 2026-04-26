import mongoose from 'mongoose';

const switchSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'TRIGGERED', 'EXECUTING', 'COMPLETED', 'CANCELLED'],
      default: 'ACTIVE',
    },
    lastCheckIn: {
      type: Date,
      default: Date.now,
    },
    inactivityPeriod: {
      type: Number,
      required: true,
    },
    triggerAt: {
      type: Date,
      required: true,
    },
    executionAt: {
      type: Date,
    },
    isHighValue: {
      type: Boolean,
      default: false,
    },
    altitudeSafeAddress: {
      type: String,
      trim: true,
    },
    vaultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vault',
    },
  },
  { timestamps: true }
);

const Switch = mongoose.model('Switch', switchSchema);
export default Switch;
