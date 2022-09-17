import express from 'express';
import authRouter from './AuthRouter';

const router = express.Router();
router.use(authRouter)
export default router;
