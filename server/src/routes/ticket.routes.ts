import express from "express";

import {
  createTicket,
  getTickets,
  addMessageToTicket,
  updateTicketStatus,
  assignTicket,
  generateAIDraftResponse,
} from "../controllers/ticket.controller";
import { adminOnly } from "../middleware/role.middleware";


import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createTicket);

router.get("/", protect, getTickets);

router.post(
  "/:id/message",
  protect,
  addMessageToTicket
);

router.put(
  "/:id/status",
  protect,
  updateTicketStatus
);

router.put(
  "/:id/assign",
  protect,
  adminOnly,
  assignTicket
);


router.post(
  "/:id/ai-response",
  protect,
  adminOnly,
  generateAIDraftResponse
);
export default router;