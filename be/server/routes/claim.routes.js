import express from 'express';
import { redeemClaim } from '../controllers/claim.controller.js';

const router = express.Router();

router.post('/redeem', redeemClaim);

export default router;
