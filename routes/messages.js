import { Router } from "express";
import {
  allMessages,
  deleteMessage,
  editMessage,
  messageById,
  searchMessage,
  sendMessage,
  viewMessage,
} from "../controllers/messages.js";
const router = Router();

router.post("/message/:id", sendMessage);
router.put("/message/:id", editMessage);
router.put("/message/:id/viewed", viewMessage);
router.delete("/message/:id", deleteMessage);
router.get("/message/:id", messageById);
router.get("/message/search", searchMessage);
router.get("/message/all", allMessages);

export default router;
