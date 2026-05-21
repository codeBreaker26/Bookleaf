import { Response } from "express";

import { Request } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json({
    message: "Protected profile route accessed",

    user: req.user,
  });
};