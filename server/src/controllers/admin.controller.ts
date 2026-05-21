import { Request, Response } from "express";

import Book from "../models/Book";
import Ticket from "../models/Ticket";
import User from "../models/User";

export const getAdminDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const totalBooks =
      await Book.countDocuments();

    const totalTickets =
      await Ticket.countDocuments();

    const openTickets =
      await Ticket.countDocuments({
        status: "Open",
      });

    const resolvedTickets =
      await Ticket.countDocuments({
        status: "Resolved",
      });

    const totalAuthors =
      await User.countDocuments({
        role: "author",
      });

    const books = await Book.find();

    let totalRoyalty = 0;

    books.forEach((book: any) => {
      totalRoyalty +=
        book.totalRoyaltyEarned || 0;
    });

    res.status(200).json({
      totalBooks,
      totalTickets,
      openTickets,
      resolvedTickets,
      totalAuthors,
      totalRoyalty,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};