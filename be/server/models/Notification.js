import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    switchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true,
    },
    type: {
      type: String,
      enum: ['7D', '3D', '24H', 'TRIGGER'],
      required: true,
    },
    sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
