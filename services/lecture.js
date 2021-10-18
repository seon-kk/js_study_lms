const Joi = require('joi');
const validator = require('../utils/validator');

const CustomError = require("../utils/customError");

const lectureModel = require("../models/lecture");
const teacherModel = require("../models/teacher");
const categoryModel = require("../models/category");
const enrollmentModel = require("../models/enrollment");


exports.getLectureList = async (search) => {
    
    const dbResult = await lectureModel.getLectureList(search);

    if(dbResult.totalCount < 1) {
        search.message = `There's no lecture at this condition.`
        throw new CustomError(search, 404);
    }

    let result = search;

    result.totalCount = dbResult.totalCount;
    result.list = dbResult.pagedResult;

    return result;
}

exports.getLectureDetail = async (id) => {

    let lectureInfo = await lectureModel.getLectureDetail(id);
    //해당 강의 없음
    if(!lectureInfo[0].id) {
        throw new CustomError(`${id}: There's no lecture in this id.`, 404);
    }
    lectureInfo = lectureInfo[0];

    if(lectureInfo.visibility == 1) {
        lectureInfo.visibility = '공개';
    } else {
        lectureInfo.visibility = '비공개';
    }

    //학생 수가 0보다 큰 경우 리스트 검색
    if(lectureInfo.totalStudent > 0) {
        let studentList = await enrollmentModel.getStudentByEnroll(id);
        lectureInfo.studentList = studentList;    
    }

    return lectureInfo;
}

exports.setLecture = async (lecture) => {

    //강사id 유무 확인
    const teacherCheck = await teacherModel.getTeacher(lecture.teacherId);
    if(teacherCheck.length < 1) {
        throw new CustomError(`${lecture.teacherId}: There's no teacher in this id.`, 404);
    }
    //카테고리 유무 확인
    const categoryCheck = await categoryModel.getCategory(lecture.categoryId);
    if(categoryCheck.length < 1) {
        throw new CustomError(`${lecture.categoryId}: There's no category in this id.`, 404);
    }

    const result = await lectureModel.setLecture(lecture);
    return result;
}

exports.modifyLecture = async (lecture) => {
    const lectureId = lecture.lectureId;

    //대상 강의 유무 확인
    const lectureCheck = await lectureModel.getLecture(lectureId);
    if(lectureCheck.length < 1) {
        throw new CustomError(`${lectureId}: There's no lecture in this id.`, 404);
    }

    delete lecture.lectureId;

    const modelResult = await lectureModel.modifyLecture(lectureId, lecture);
    return modelResult;
}

exports.lectureVisible = async (id) => {

    //대상 강의 유무 확인
    const lectureCheck = await lectureModel.getLecture(id);
    if(lectureCheck.length != 1) {
        throw new CustomError(`${id}: There's no lecture in this id.`, 404);
    }
    //공개 강의인지 확인
    if(lectureCheck[0].visibility == 1) {
        throw new CustomError(`${id}: This Lecture is already visible`, 400);
    }

    const modelResult = await lectureModel.lectureVisible(id);
    return modelResult;
}


exports.deleteLecture = async (id) => {
    const lectureCheck = await lectureModel.getLecture(id);
    if(lectureCheck.length == 0) {
        throw new CustomError(`${id}: There's no lecture in this id.`, 404);
    }

    //등록된 수강생 확인
    let studentCheck = await enrollmentModel.getStudentByEnroll(id);
    if(studentCheck.length > 0) {
        throw new CustomError(`${id}: There are students in this lecture.`, 400);
    }

    const dbResult = await lectureModel.deleteLecture(id);
    return {
        affectedRows: dbResult.affectedRows
    }
}