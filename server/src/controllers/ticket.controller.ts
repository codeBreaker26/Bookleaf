import { Request, Response } from "express";
import { analyzeTicket } from "../services/ai.service";
import Ticket from "../models/Ticket";

interface AuthRequest extends Request {
  user?: any;
}

// CREATE TICKET
export const createTicket = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
    subject,
    description,
    book,
    } = req.body;

    const aiAnalysis = await analyzeTicket(
  subject,
  description
);

const ticket = await Ticket.create({
  subject,
  description,
  book,

  category: aiAnalysis.category,
  priority: aiAnalysis.priority,
  aiDraftResponse:
    aiAnalysis.draftResponse,

  author: req.user._id,
});
    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};






// GET ALL TICKETS
// GET ALL TICKETS
export const getTickets = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status, priority } = req.query;

    let filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (req.user && req.user.role !== "admin") {
      filter.author = req.user._id;
    }

    const tickets = await Ticket.find(filter)
      .populate("author", "name email")
      .populate("book", "title")
      .populate("assignedTo", "name email");

    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addMessageToTicket = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ticket = await Ticket.findById(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const { message } = req.body;

    ticket.messages.push({
      sender: req.user._id,

      senderRole: req.user.role,

      message,
    });

    await ticket.save();

    res.status(200).json({
      message: "Reply added successfully",

      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const updateTicketStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ticket = await Ticket.findById(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const { status } = req.body;

    ticket.status = status;

    await ticket.save();

    res.status(200).json({
      message: "Ticket status updated",
      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const assignTicket = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { assignedTo } = req.body;

    const ticket = await Ticket.findById(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.assignedTo = assignedTo;

    ticket.status = "In Progress";

    await ticket.save();

    res.status(200).json({
      message: "Ticket assigned successfully",

      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



export const generateAIDraftResponse =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const ticket = await Ticket.findById(
        req.params.id
      );

      if (!ticket) {
        return res.status(404).json({
          message: "Ticket not found",
        });
      }

      // MOCK AI RESPONSE
      const aiDraft = `
Hello,

We have received your issue regarding "${ticket.subject}".

Our support team is currently reviewing the matter and will get back to you shortly.

Thank you for your patience.

Regards,
BookLeaf Support Team
`;

      ticket.aiDraftResponse = aiDraft;

      await ticket.save();

      res.status(200).json({
        message:
          "AI draft generated successfully",

        aiDraft,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };