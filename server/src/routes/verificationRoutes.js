import express from "express";
import { validateJobPost } from "../controllers/verificationController.js";

const router = express.Router();

router.post("/validate", validateJobPost);

export default router;
