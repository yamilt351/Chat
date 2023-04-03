import { Router } from "express";
const router = Router();

router.post("/message/:id");
router.put("/message/:id");
router.put("/message/:id/viewed");
router.delete("/message/:id");
router.get("/message/:id");
router.get("/message/search");
router.get("/message/all");

export default router;
