import { Request, Response } from "express";

import Book from "../models/Book";

interface AuthRequest extends Request {
  user?: any;
}

// GET ALL BOOKS
export const getBooks = async (
  req: Request,
  res: Response
) => {
  try {
    const books = await Book.find().populate(
      "author",
      "name email"
    );

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CREATE BOOK
export const createBook = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      bookId,
      title,
      genre,
      publicationDate,
      mrp,
    } = req.body;

    const newBook = await Book.create({
      bookId,
      title,
      genre,
      publicationDate,
      mrp,

      author: req.user._id,
    });

    res.status(201).json({
      message: "Book created successfully",
      newBook,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: "Server Error",
    error,
  });
}
};


export const updateBook = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // OWNER CHECK
    if (
      book.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const deleteBook = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (
      book.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};