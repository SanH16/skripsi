import express from "express";
import { getDataReward, createReward } from "../controllers/Reward.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/rewards", verifyUser, getDataReward);
router.get("/rewards/:id", verifyUser);
router.post("/create-rewards", verifyUser, adminOnly, createReward); // login first
router.patch("/rewards/:id", verifyUser); // login first
router.delete("/rewards/:id", verifyUser); // login first

export default router;
