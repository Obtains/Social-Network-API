// Dependencies
const router = require('express').Router();
const apiRoutes = require('./api');

// Import API routes
router.use('/api', apiRoutes);

// 404 Error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error Found!</h1>');
});

module.exports = router;