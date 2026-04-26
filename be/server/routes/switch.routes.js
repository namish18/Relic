import express from 'express';
import {
  createSwitch,
  getAllSwitches,
  checkIn,
  cancelSwitch,
} from '../controllers/switch.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/create', createSwitch);
router.get('/all', getAllSwitches);
router.post('/checkin/:id', checkIn);
router.post('/cancel/:id', cancelSwitch);

export default router;
