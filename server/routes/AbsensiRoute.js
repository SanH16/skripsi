import express from "express";
import {
  getDataAbsensi,
  getAbsensiById,
  createAbsensi,
  updateAbsensi,
  deleteAbsensi,
  upload,
} from "../controllers/Absensi.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/absensi", verifyUser, getDataAbsensi);
router.get("/absensi/:id", verifyUser, getAbsensiById);
router.post("/create-absensi", verifyUser, upload, createAbsensi); // login first
router.patch("/absensi/:id", verifyUser, upload, updateAbsensi); // login first
router.delete("/absensi/:id", verifyUser, adminOnly, deleteAbsensi); // login first

export default router;
