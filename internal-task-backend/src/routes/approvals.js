const express = require('express');
const { createApproval, getApprovals, approveApproval, rejectApproval } = require('../controllers/approvalController');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/role');

const router = express.Router();

router.post('/', auth, createApproval);
router.get('/', auth, getApprovals);
router.put('/:id/approve', auth, authorizeRole('manager'), approveApproval);
router.put('/:id/reject', auth, authorizeRole('manager'), rejectApproval);

module.exports = router;