import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Póbris API is running',
        timestamp: new Date().toISOString()
    });
});

export { router as routes };
