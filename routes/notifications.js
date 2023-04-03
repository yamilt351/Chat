import { Router } from "express";
import {
  allNotifications,
  deleteNotifications,
  getNotificationsById,
  sendNotifications,
  viewNotifications,
} from "../controllers/notifications.js";

const router = Router();

router.post("/notifications/:id", sendNotifications);
router.delete("/notifications/:id", deleteNotifications);
router.put("/notifications/id", viewNotifications);
router.get("/notifications/:id", getNotificationsById);
router.get("/notifications/all", allNotifications);

export default router;
