const express = require('express');
const router = express.Router();
const enrollmentCon = require('./../controllers/enrollment');

router.post('/', enrollmentCon.setEnrollment);

module.exports = router;