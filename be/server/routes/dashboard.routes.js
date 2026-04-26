import express from 'express';
import { getOwnerDashboard, getBeneficiaryDashboard } from '../controllers/dashboard.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/owner', getOwnerDashboard);
router.get('/beneficiary', getBeneficiaryDashboard);

export default router;
