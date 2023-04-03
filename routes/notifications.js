import { Router } from "express";

const router = Router();

router.post("/notifications/:id");
router.delete("/notifications/:id");
router.put("/notifications/id");
router.get("/notifications/:id");
router.get("/notifications/all");
