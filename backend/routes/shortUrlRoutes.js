const express = require('express');
const { shortenUrl, getAnalytics, redirectUrl } = require('../controllers/shortUrlController');
const router = express.Router();

router.post('/api/shorten', shortenUrl);
router.get('/api/analytics/:code', getAnalytics);

router.get('/:code', redirectUrl);

module.exports = router;