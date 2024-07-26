import express from "express";
import { getDataPunishment } from "../controllers/Punishment.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/punishment", verifyUser, getDataPunishment);
// router.get("/punishment/:id", verifyUser );
// router.post("/create-punishment", verifyUser); // login first
// router.patch("/punishment/:id", verifyUser); // login first
// router.delete("/punishment/:id", verifyUser); // login first

export default router;
