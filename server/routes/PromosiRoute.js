import express from "express";
import { getDataPromosi } from "../controllers/Promosi.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/promosi", verifyUser, getDataPromosi);
// router.get("/promosi/:id", verifyUser );
// router.post("/create-promosi", verifyUser); // login first
// router.patch("/promosi/:id", verifyUser); // login first
// router.delete("/promosi/:id", verifyUser); // login first

export default router;
