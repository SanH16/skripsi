import express from "express";
import { getDataLamaran, createLamaran, deleteLamaran } from "../controllers/Lamaran.js";

const router = express.Router();

router.get("/lamaran", getDataLamaran);
// router.get("/lamaran/:id", );
router.post("/create-lamaran", createLamaran);
router.delete("/lamaran/:id", deleteLamaran);

export default router;
