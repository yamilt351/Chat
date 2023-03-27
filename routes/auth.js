import { Router } from 'express';
import { signin,signup, verificationToken } from '../controllers/auth.js';
const router= Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/tokenAuth',verificationToken)
export default router;
