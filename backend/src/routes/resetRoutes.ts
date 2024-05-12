import express from 'express';
import { requestPasswordReset, verifyResetCode, resetPassword } from '../controllers/resetController.js';

const router = express.Router();

router.post('/reset/request', requestPasswordReset);

router.post('/reset/verify', verifyResetCode);

router.put('/reset/password', resetPassword);

export default router;
