import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
    },

    name: {
      type: String,
      required: true,
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

    phone: {
      type: String,
    },

    city: {
      type: String,
    },

    joinedDate: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["author", "admin"],
      default: "author",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;