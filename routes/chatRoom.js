import { Router } from "express";
import {
  getAllRooms,
  getIdRoom,
  deleteRoom,
  editRoom,
  createRoom,
  searchRoom,
} from "../controllers/chatRoom.js";
const router = Router();

router.post("/chatRoom/", createRoom);
router.put("/chatRoom/:chatRoomId", editRoom);
router.delete("/chatRoom/:chatRoomId", deleteRoom);
router.get("/chatRoom/:chatRoomId", getIdRoom);
router.get("/search", searchRoom);
router.get("/all/chatRoom", getAllRooms);

export default router;
