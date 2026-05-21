import express from "express";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/book.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getBooks);

router.post("/", protect, createBook);

router.put("/:id", protect, updateBook);

router.delete("/:id", protect, deleteBook);

export default router;