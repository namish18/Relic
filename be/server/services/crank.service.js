import cron from 'node-cron';
import Switch from '../models/Switch.js';
import Vault from '../models/Vault.js';
import Beneficiary from '../models/Beneficiary.js';
import { executePipeline } from './solana.service.js';

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
