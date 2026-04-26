import express from 'express';
import { generateNonce, verifySignatureAndLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/nonce', generateNonce);
router.post('/verify', verifySignatureAndLogin);

export default router;
