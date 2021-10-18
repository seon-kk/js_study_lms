const express = require('express');
const router = express.Router();
const lectureCon = require('./../controllers/lecture');

router.get('/', lectureCon.getLectureList);
router.get('/:lectureId', lectureCon.getLectureDetail);
router.delete('/:lectureId', lectureCon.deleteLecture);

router.post('/', lectureCon.setLecture);
router.put('/', lectureCon.modifyLecture);
router.put('/visible/:lectureId', lectureCon.lectureVisible);

module.exports = router;