const express = require('express');
const router = express.Router();
const studentCon = require('./../controllers/student');

router.get('/', studentCon.getStudentList);
router.post('/', studentCon.setStudent);
router.delete('/:studentId', studentCon.deleteStudent);

module.exports = router;