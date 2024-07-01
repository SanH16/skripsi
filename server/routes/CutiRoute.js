import express from "express";
import { getAllCuti, getCutiById, createCuti, updateCuti, deleteCuti } from "../controllers/Cuti.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/cuti", verifyUser, getAllCuti);
router.get("/cuti/:id", verifyUser, getCutiById);
router.post("/create-cuti", verifyUser, createCuti); // login first
router.patch("/cuti/:id", verifyUser, updateCuti); // login first
router.delete("/cuti/:id", verifyUser, deleteCuti); // login first

export default router;
