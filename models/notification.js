import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatGroup",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Notification", NotificationSchema);
