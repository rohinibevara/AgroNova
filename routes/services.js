const express = require('express');
const { getServices, getService, createService } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', createService);

// Add a simple test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Services route is working!'
    });
});

module.exports = router;