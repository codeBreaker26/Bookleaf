import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
   // next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

//  next();
});

userSchema.methods.matchPassword =
  async function (enteredPassword: string) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

const User = mongoose.model("User", userSchema);

export default User;