import express from "express";
import { Login, LogOut, GetUserLogin } from "../controllers/Auth.js";

const router = express.Router();

router.get("/get-user-login", GetUserLogin);
router.post("/login", Login);
router.delete("/logout", LogOut);

export default router;
