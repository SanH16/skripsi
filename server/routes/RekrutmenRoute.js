import express from "express";
import {
  getRekrutmens,
  getRekrutmenById,
  createRekrutmen,
  updateRekrutmen,
  deleteRekrutmen,
} from "../controllers/Rekrutmens.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/rekrutmens", verifyUser, getRekrutmens);
router.get("/rekrutmens/:id", verifyUser, getRekrutmenById);
router.post("/rekrutmens", verifyUser, createRekrutmen); // login first
router.patch("/rekrutmens/:id", verifyUser, updateRekrutmen); // login first
router.delete("/rekrutmens/:id", verifyUser, deleteRekrutmen); // login first

export default router;
