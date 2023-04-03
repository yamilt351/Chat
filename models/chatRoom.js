import mongoose from 'mongoose';;
const ChatGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictureId: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("ChatGroup", ChatGroupSchema);
