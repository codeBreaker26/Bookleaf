import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db";

import User from "../models/User";
import Book from "../models/Book";

import sampleData from "./bookleaf_sample_data.json";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();

    console.log("Old data cleared");

    // Create admin user
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@bookleaf.com",
      password: hashedAdminPassword,
      role: "admin",
    });

    console.log("Admin created");

    // Insert authors and books
    for (const authorData of sampleData.authors) {
      const hashedPassword = await bcrypt.hash("author123", 10);

      const createdAuthor = await User.create({
        authorId: authorData.author_id,
        name: authorData.name,
        email: authorData.email,
        password: hashedPassword,
        phone: authorData.phone,
        city: authorData.city,
        joinedDate: authorData.joined_date,
        role: "author",
      });

      for (const bookData of authorData.books) {
        await Book.create({
          bookId: bookData.book_id,
          author: createdAuthor._id,

          title: bookData.title,
          isbn: bookData.isbn,
          genre: bookData.genre,

          publicationDate: bookData.publication_date,

          status: bookData.status,

          mrp: bookData.mrp,

          authorRoyaltyPerCopy:
            bookData.author_royalty_per_copy,

          totalCopiesSold:
            bookData.total_copies_sold,

          totalRoyaltyEarned:
            bookData.total_royalty_earned,

          royaltyPaid:
            bookData.royalty_paid,

          royaltyPending:
            bookData.royalty_pending,

          lastRoyaltyPayoutDate:
            bookData.last_royalty_payout_date,

          printPartner:
            bookData.print_partner,

          availableOn:
            bookData.available_on,
        });
      }
    }

    console.log("Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();