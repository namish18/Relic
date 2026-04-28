import express from 'express';
import { redeemClaim } from '../controllers/claim.controller.js';
import { registerClaim } from '../controllers/claimRegister.controller.js';
import privyAuthMiddleware from '../middleware/privyAuth.middleware.js';

const router = express.Router();

router.post('/redeem', redeemClaim);
router.post('/register/:switchId', privyAuthMiddleware, registerClaim);

export default router;
