import express from "express";
import {
  getRekrutmens,
  getRekrutmenById,
  createRekrutmen,
  updateRekrutmen,
  deleteRekrutmen,
} from "../controllers/Rekrutmens.js";

const router = express.Router();

router.get("/rekrutmens", getRekrutmens);
router.get("/rekrutmens/:id", getRekrutmenById);
router.post("/rekrutmens", createRekrutmen);
router.patch("/rekrutmens/:id", updateRekrutmen);
router.delete("/rekrutmens/:id", deleteRekrutmen);

export default router;
