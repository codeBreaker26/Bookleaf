import express from "express";

import { getAdminDashboard } from "../controllers/admin.controller";

import { protect }
from "../middleware/auth.middleware";

import { adminOnly }
from "../middleware/role.middleware";
const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

export default router;