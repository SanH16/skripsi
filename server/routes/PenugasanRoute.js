import express from "express";
import {
  getAllPenugasan,
  createPenugasan,
  deletePenugasan,
  getPenugasanById,
  updatePenugasan,
} from "../controllers/Penugasan.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/penugasan", verifyUser, getAllPenugasan);
router.get("/penugasan/:id", verifyUser, getPenugasanById);
router.post("/create-penugasan", verifyUser, adminOnly, createPenugasan); // login first
router.patch("/penugasan/:id", verifyUser, updatePenugasan); // login first
router.delete("/penugasan/:id", verifyUser, adminOnly, deletePenugasan); // login first

export default router;
