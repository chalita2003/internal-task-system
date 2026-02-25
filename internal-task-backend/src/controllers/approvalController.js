const Approval = require('../models/Approval');

exports.createApproval = async (req, res) => {
  try {
    const { title, description, type, amount } = req.body;
    const approvalId = await Approval.create(title, description, type, req.user.id, amount);
    res.status(201).json({ message: 'Approval requested', approvalId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApprovals = async (req, res) => {
  try {
    const approvals = await Approval.findAll(req.user.id, req.user.role);
    res.json(approvals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    await Approval.updateStatus(id, 'approved', req.user.id, comment);
    res.json({ message: 'Approval approved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rejectApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    await Approval.updateStatus(id, 'rejected', req.user.id, comment);
    res.json({ message: 'Approval rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};