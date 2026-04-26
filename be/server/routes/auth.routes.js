import express from 'express';
import {
  generateNonce,
  verifySignatureAndLogin,
  privyAuth,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/nonce', generateNonce);
router.post('/verify', verifySignatureAndLogin);
router.post('/privy', privyAuth);

export default router;
