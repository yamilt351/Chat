import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureId: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
	token: {
   type:Number,
	},
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
  },
  chatGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatGroup",
    },
  ],
  online: {
    status: {
      type: String,
      enum: ["active", "away", "dnd", "offline"],
      default: "active",
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  reaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reaction",
  },
  description: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 0,
  },
  links: {
    type: [String],
  },
  relationships: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        enum: ["friend", "group"],
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "blocked"],
        required: true,
      },
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default mongoose.model("User", UserSchema);
