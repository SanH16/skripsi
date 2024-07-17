import express from "express";
import { getDataReward } from "../controllers/Reward.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/rewards", verifyUser, getDataReward);
router.get("/rewards/:id", verifyUser);
router.post("/rewards", verifyUser); // login first
router.patch("/rewards/:id", verifyUser); // login first
router.delete("/rewards/:id", verifyUser); // login first

export default router;
