const express = require('express');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);

module.exports = router;