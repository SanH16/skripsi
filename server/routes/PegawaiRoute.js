import express from "express";
import { getDataPegawai, getPegawaiById, createPegawai, updatePegawai, deletePegawai } from "../controllers/Pegawai.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pegawai", verifyUser, getDataPegawai);
router.get("/pegawai/:id", verifyUser, getPegawaiById);
router.post("/create-pegawai", verifyUser, createPegawai); // login first
router.patch("/pegawai/:id", verifyUser, updatePegawai); // login first
router.delete("/pegawai/:id", verifyUser, adminOnly, deletePegawai); // login first admin only

export default router;
