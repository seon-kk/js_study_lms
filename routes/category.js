const express = require('express');
const router = express.Router();
const categoryCon = require('./../controllers/category');

router.get('/', categoryCon.getCategoryList);

module.exports = router;