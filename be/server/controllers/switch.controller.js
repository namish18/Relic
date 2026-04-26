import Switch from '../models/Switch.js';
import Vault from '../models/Vault.js';

export const createSwitch = async (req, res) => {
  const { name, inactivityPeriod, isHighValue, altitudeSafeAddress, assets, messages, files, reflectVaultRef } = req.body;
  const owner = req.user.walletAddress;

  if (!name || !inactivityPeriod) {
    return res.status(400).json({ message: 'name and inactivityPeriod are required' });
  }

  const triggerAt = new Date(Date.now() + inactivityPeriod * 24 * 60 * 60 * 1000);

  const newSwitch = await Switch.create({
    owner,
    name,
    inactivityPeriod,
    triggerAt,
    isHighValue: isHighValue || false,
    altitudeSafeAddress: altitudeSafeAddress || null,
  });

  const vault = await Vault.create({
    switchId: newSwitch._id,
    assets: assets || [],
    messages: messages || [],
    files: files || [],
    reflectVaultRef: reflectVaultRef || null,
  });

  newSwitch.vaultId = vault._id;
  await newSwitch.save();

  return res.status(201).json({ switch: newSwitch, vault });
};

export const getAllSwitches = async (req, res) => {
  const owner = req.user.walletAddress;
  const switches = await Switch.find({ owner }).populate('vaultId');
  return res.status(200).json({ switches });
};

export const checkIn = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.walletAddress;

  const sw = await Switch.findById(id);

  if (!sw) {
    return res.status(404).json({ message: 'Switch not found' });
  }

  if (sw.owner !== owner) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (sw.status !== 'ACTIVE') {
    return res.status(400).json({ message: 'Only ACTIVE switches can be checked in' });
  }

  sw.lastCheckIn = new Date();
  sw.triggerAt = new Date(Date.now() + sw.inactivityPeriod * 24 * 60 * 60 * 1000);
  await sw.save();

  return res.status(200).json({ message: 'Check-in successful', switch: sw });
};

export const cancelSwitch = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.walletAddress;

  const sw = await Switch.findById(id);

  if (!sw) {
    return res.status(404).json({ message: 'Switch not found' });
  }

  if (sw.owner !== owner) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (['COMPLETED', 'CANCELLED'].includes(sw.status)) {
    return res.status(400).json({ message: 'Switch is already finalized' });
  }

  sw.status = 'CANCELLED';
  await sw.save();

  return res.status(200).json({ message: 'Switch cancelled', switch: sw });
};
