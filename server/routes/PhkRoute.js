import express from "express";
import { getDataPHK, createPhk, deletePhk, getPhkById } from "../controllers/Phk.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/phk", verifyUser, getDataPHK);
router.get("/phk/:id", verifyUser, getPhkById);
router.post("/create-phk", verifyUser, createPhk); // login first
// router.patch("/phk/:id", verifyUser); // login first
router.delete("/phk/:id", verifyUser, deletePhk); // login first

export default router;
