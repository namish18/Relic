import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import switchRoutes from './routes/switch.routes.js';
import claimRoutes from './routes/claim.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import startCrankService from './services/crank.service.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/switch', switchRoutes);
app.use('/claim', claimRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  startCrankService();
  app.listen(PORT, () => {
    console.log(`Relic backend running on port ${PORT}`);
  });
};

start();
