const express = require('express');
const router = express.Router();
const teacherCon = require('./../controllers/teacher');

router.get('/', teacherCon.getTeacherList);

module.exports = router;