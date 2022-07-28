const express = require('express');
const router = express.Router();

const { createCertificate } = require('../controllers/certificateController');

router.get('/:id', createCertificate);

module.exports = router;
