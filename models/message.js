const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup",
    required: true,
  },
  reaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
      required: true,
    },
  ],
  content: {
    text: String,
    emojis: [String],
    images: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  viewed: {
    type: Boolean,
    highlighted: Boolean,
  },
});
export default mongoose.model("Message", MessageSchema);
