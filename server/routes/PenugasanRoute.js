import express from "express";
import { getAllPenugasan, createPenugasan, deletePenugasan } from "../controllers/Penugasan.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/penugasan", verifyUser, getAllPenugasan);
// router.get("/penugasan/:id", verifyUser, );
router.post("/create-penugasan", verifyUser, createPenugasan); // login first
// router.patch("/penugasan/:id", verifyUser, ); // login first
router.delete("/penugasan/:id", verifyUser, adminOnly, deletePenugasan); // login first

export default router;
