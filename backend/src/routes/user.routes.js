const express = require('express');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile endpoint - to be implemented' });
});

router.put('/profile', protect, (req, res) => {
  res.json({ message: 'Update profile endpoint - to be implemented' });
});

module.exports = router;
