import { Router } from "express";
import {
  allReactions,
  deleteReactions,
  editReactions,
  getReactionsById,
  searchReactions,
  sendReactions,
} from "../controllers/reactions.js";

const router = Router();

router.post("/reactions/:id", sendReactions);
router.delete("/reactions/:id", deleteReactions);
router.put("/reactions/:id", editReactions);
router.get("/reactions/:id", getReactionsById);
router.get("/reactions", allReactions);
router.get("/search", searchReactions);

export default router;
