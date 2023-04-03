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

router.post("/chatRoom", createRoom);
router.put("/chatRoom/:id", editRoom);
router.delete("/chatRoom/:id", deleteRoom);
router.get("/chatRoom/:id", getIdRoom);
router.get("/search", searchRoom);
router.get("/all/chatRoom", getAllRooms);

export default router;
