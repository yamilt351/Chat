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

router.post("/message/:chatRoomId", sendMessage);
router.put("/message/:messageId", editMessage);
router.put("/message/:messageId/viewed", viewMessage);
router.delete("/message/:messageId", deleteMessage);
router.get("/message/:messageId", messageById);
router.get("/message/search", searchMessage);
router.get("/message/all", allMessages);

export default router;
