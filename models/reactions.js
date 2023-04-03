import mongoose from 'mongoose';
const ReactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "love", "haha", "wow", "sad", "angry"],
    required: true,
  },
  chatGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Reaction", ReactionSchema);
