import express from "express";
import { getDataMutasi, getMutasiById, createMutasi, updateMutasi, deleteMutasi } from "../controllers/Mutasi.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/mutasi", verifyUser, getDataMutasi);
router.get("/mutasi/:id", verifyUser, getMutasiById);
router.post("/create-mutasi", verifyUser, createMutasi); // login first
router.patch("/mutasi/:id", verifyUser, updateMutasi); // login first
router.delete("/mutasi/:id", verifyUser, adminOnly, deleteMutasi); // login first

export default router;
