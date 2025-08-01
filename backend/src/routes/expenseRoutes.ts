import { Router } from 'express';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({ message: 'Get expenses endpoint - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create expense endpoint - coming soon' });
});

router.post('/scan-receipt', (req, res) => {
  res.json({ message: 'AI receipt scanning endpoint - coming soon' });
});

export default router;
