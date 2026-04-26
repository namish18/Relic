import cron from 'node-cron';
import nodemailer from 'nodemailer';
import Switch from '../models/Switch.js';
import Vault from '../models/Vault.js';
import Beneficiary from '../models/Beneficiary.js';
import { executePipeline } from './solana.service.js';
import { generateClaimToken } from '../utils/token.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const sendClaimEmail = async (email, claimUrl) => {
  if (!process.env.SMTP_USER) {
    console.log(`[Crank] [Mock Email] To: ${email} | Claim URL: ${claimUrl}`);
    return;
  }
  await transporter.sendMail({
    from: `"Relic" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'You have an inheritance waiting — Relic',
    html: `
      <h2>You have been listed as a beneficiary</h2>
      <p>Click the link below to claim your assets:</p>
      <a href="${claimUrl}" style="font-size:16px;color:#7c3aed;">Claim Now</a>
      <p>This link expires in 7 days.</p>
    `,
  });
  console.log(`[Crank] Claim email sent to ${email}`);
};

const executeTransfer = async (sw) => {
  console.log(`[Crank] Executing transfer for switch: ${sw._id}`);

  sw.status = 'EXECUTING';
  await sw.save();

  const vault = await Vault.findOne({ switchId: sw._id });
  const beneficiaries = await Beneficiary.find({ switchId: sw._id });

  if (!vault) {
    console.error(`[Crank] No vault found for switch ${sw._id}`);
    sw.status = 'COMPLETED';
    await sw.save();
    return;
  }

  await executePipeline(vault, beneficiaries, null);

  sw.status = 'COMPLETED';
  await sw.save();

  console.log(`[Crank] Switch ${sw._id} marked COMPLETED`);

  const emailBeneficiaries = await Beneficiary.find({ switchId: sw._id, type: 'EMAIL' });
  for (const ben of emailBeneficiaries) {
    if (!ben.email) continue;
    const claimToken = generateClaimToken({
      switchId: String(sw._id),
      beneficiaryId: String(ben._id),
      email: ben.email,
    });
    const claimUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/claim?token=${claimToken}`;
    await sendClaimEmail(ben.email, claimUrl);
  }
};

const startCrankService = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    const switchesToTrigger = await Switch.find({
      status: 'ACTIVE',
      triggerAt: { $lte: now },
    });

    for (const sw of switchesToTrigger) {
      sw.status = 'TRIGGERED';
      sw.executionAt = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      await sw.save();
      console.log(`[Crank] Switch ${sw._id} TRIGGERED. ExecutionAt: ${sw.executionAt}`);
    }

    const switchesToExecute = await Switch.find({
      status: 'TRIGGERED',
      executionAt: { $lte: now },
    });

    for (const sw of switchesToExecute) {
      await executeTransfer(sw);
    }
  });

  console.log('[Crank] Crank service started — running every minute');
};

export default startCrankService;
