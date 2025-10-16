const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');
const { contactValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', contactValidation, submitContact);
router.get('/', getContacts);

// Add a simple test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Contact route is working!'
    });
});

module.exports = router;