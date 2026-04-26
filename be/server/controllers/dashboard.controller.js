import Switch from '../models/Switch.js';
import Beneficiary from '../models/Beneficiary.js';
import Vault from '../models/Vault.js';

export const getOwnerDashboard = async (req, res) => {
  const walletAddress = req.user.walletAddress;

  if (!walletAddress) {
    return res.status(403).json({ message: 'Owner dashboard requires a wallet address' });
  }

  const switches = await Switch.find({ owner: walletAddress }).lean();
  const now = new Date();

  const enriched = await Promise.all(
    switches.map(async (sw) => {
      const beneficiaryCount = await Beneficiary.countDocuments({ switchId: sw._id });

      const timeLeftMs = sw.triggerAt ? new Date(sw.triggerAt) - now : null;
      const timeLeftDays =
        timeLeftMs !== null ? Math.max(0, Math.floor(timeLeftMs / (1000 * 60 * 60 * 24))) : null;
      const timeLeftHours =
        timeLeftMs !== null
          ? Math.max(0, Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
          : null;

      return {
        _id: sw._id,
        name: sw.name,
        status: sw.status,
        inactivityPeriod: sw.inactivityPeriod,
        lastCheckIn: sw.lastCheckIn,
        triggerAt: sw.triggerAt,
        executionAt: sw.executionAt,
        isHighValue: sw.isHighValue,
        countdown: {
          timeLeftMs: timeLeftMs !== null ? Math.max(0, timeLeftMs) : null,
          days: timeLeftDays,
          hours: timeLeftHours,
          overdue: timeLeftMs !== null && timeLeftMs < 0,
        },
        beneficiaryCount,
        createdAt: sw.createdAt,
        updatedAt: sw.updatedAt,
      };
    })
  );

  return res.status(200).json({ switches: enriched, total: enriched.length });
};

export const getBeneficiaryDashboard = async (req, res) => {
  const { walletAddress, email } = req.user;

  if (!walletAddress && !email) {
    return res.status(403).json({ message: 'No identity found on token' });
  }

  const orQuery = [];
  if (walletAddress) orQuery.push({ walletAddress, type: 'WALLET' });
  if (email) orQuery.push({ email, type: 'EMAIL' });

  const beneficiaries = await Beneficiary.find({ $or: orQuery }).lean();

  if (beneficiaries.length === 0) {
    return res.status(200).json({ switches: [], total: 0 });
  }

  const enriched = await Promise.all(
    beneficiaries.map(async (ben) => {
      const sw = await Switch.findById(ben.switchId).lean();
      const vault = await Vault.findOne({ switchId: ben.switchId }).lean();

      const isExecuted = sw?.status === 'COMPLETED';
      const messages = isExecuted && vault ? vault.messages.map((m) => ({
        recipient: m.recipient,
        content: `[Arcium Mock Decrypted] ${m.encryptedContent}`,
      })) : [];

      const files = isExecuted && vault ? vault.files.map((f) => ({
        fileName: f.fileName,
        cdpUrl: f.cdpUrl,
      })) : [];

      const assets = vault?.assets || [];
      const totalAmount = assets.reduce((sum, a) => sum + a.amount, 0);
      const myShare = (ben.percentage / 100) * totalAmount;

      return {
        beneficiaryId: ben._id,
        switchId: ben.switchId,
        switchName: sw?.name || null,
        switchStatus: sw?.status || null,
        percentage: ben.percentage,
        type: ben.type,
        hasClaimed: ben.hasClaimed,
        myShare,
        assets,
        messages,
        files,
      };
    })
  );

  return res.status(200).json({ switches: enriched, total: enriched.length });
};
