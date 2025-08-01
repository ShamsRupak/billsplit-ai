import { Router } from 'express';

const router = Router();

// Placeholder routes - to be implemented
router.get('/search', (req, res) => {
  res.json({ message: 'User search endpoint - coming soon' });
});

router.post('/friends', (req, res) => {
  res.json({ message: 'Add friend endpoint - coming soon' });
});

export default router;
