import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    isbn: {
      type: String,
    },

    genre: {
      type: String,
    },

    publicationDate: {
      type: Date,
    },

    status: {
      type: String,
    },

    mrp: {
      type: Number,
    },

    authorRoyaltyPerCopy: {
      type: Number,
    },

    totalCopiesSold: {
      type: Number,
      default: 0,
    },

    totalRoyaltyEarned: {
      type: Number,
      default: 0,
    },

    royaltyPaid: {
      type: Number,
      default: 0,
    },

    royaltyPending: {
      type: Number,
      default: 0,
    },

    lastRoyaltyPayoutDate: {
      type: Date,
    },

    printPartner: {
      type: String,
    },

    availableOn: [String],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;