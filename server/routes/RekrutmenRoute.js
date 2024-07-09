import express from "express";
import {
  getRekrutmens,
  getRekrutmenById,
  createRekrutmen,
  updateRekrutmen,
  deleteRekrutmen,
  upload,
} from "../controllers/Rekrutmens.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/rekrutmens", getRekrutmens);
router.get("/rekrutmens/:id", getRekrutmenById);
router.post("/rekrutmens", verifyUser, adminOnly, upload, createRekrutmen); // login first
router.patch("/rekrutmens/:id", verifyUser, adminOnly, updateRekrutmen); // login first
router.delete("/rekrutmens/:id", verifyUser, adminOnly, deleteRekrutmen); // login first

export default router;
