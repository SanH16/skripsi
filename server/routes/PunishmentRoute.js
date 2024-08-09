import express from "express";
import { getDataPunishment, getPunishmentById, createPunishment, deletePunishment } from "../controllers/Punishment.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/punishment", verifyUser, getDataPunishment);
router.get("/punishment/:id", verifyUser, getPunishmentById);
router.post("/create-punishment", verifyUser, adminOnly, createPunishment); // login first
// router.patch("/punishment/:id", verifyUser); // login first
router.delete("/punishment/:id", verifyUser, adminOnly, deletePunishment); // login first

export default router;
