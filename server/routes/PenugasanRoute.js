import express from "express";
import { getAllPenugasan, createPenugasan } from "../controllers/Penugasan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/penugasan", verifyUser, getAllPenugasan);
// router.get("/penugasan/:id", verifyUser, );
router.post("/create-penugasan", verifyUser, createPenugasan); // login first
// router.patch("/penugasan/:id", verifyUser, ); // login first
// router.delete("/penugasan/:id", verifyUser, ); // login first

export default router;
