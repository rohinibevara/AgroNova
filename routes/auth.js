const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

// Add a simple test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth route is working!'
    });
});

module.exports = router;