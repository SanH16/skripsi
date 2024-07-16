import express from "express";
import { getDataLamaran, createLamaran, deleteLamaran, upload } from "../controllers/Lamaran.js";

const router = express.Router();

router.get("/lamaran", getDataLamaran);
router.post("/create-lamaran", upload, createLamaran);
router.delete("/lamaran/:id", deleteLamaran);

export default router;
