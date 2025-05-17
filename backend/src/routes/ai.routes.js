import express from "express";
const aiRouter = express.Router();
import { getReview } from "../controllers/ai.controller.js";
aiRouter.post("/get-review", getReview);

export default aiRouter;
