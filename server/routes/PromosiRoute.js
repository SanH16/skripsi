import express from "express";
import { getDataPromosi, deletePromosi } from "../controllers/Promosi.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/promosi", verifyUser, getDataPromosi);
// router.get("/promosi/:id", verifyUser );
// router.post("/create-promosi", verifyUser); // login first
// router.patch("/promosi/:id", verifyUser); // login first
router.delete("/promosi/:id", verifyUser, adminOnly, deletePromosi); // login first

export default router;
