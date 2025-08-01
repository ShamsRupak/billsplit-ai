const express = require('express');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all expenses endpoint - to be implemented' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Add new expense endpoint - to be implemented' });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: 'Get expense by ID endpoint - to be implemented' });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: 'Update expense endpoint - to be implemented' });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: 'Delete expense endpoint - to be implemented' });
});

module.exports = router;
