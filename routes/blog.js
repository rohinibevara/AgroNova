const express = require('express');
const { getBlogs, getBlog } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);

// Add a simple test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Blog route is working!'
    });
});

module.exports = router;