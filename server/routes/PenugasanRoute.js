import express from "express";
import { getAllPenugasan } from "../controllers/Penugasan.js";
// import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/penugasan", getAllPenugasan);
// router.get("/penugasan/:id", verifyUser, );
// router.post("/create-penugasan", verifyUser, ); // login first
// router.patch("/penugasan/:id", verifyUser, ); // login first
// router.delete("/penugasan/:id", verifyUser, ); // login first

export default router;
