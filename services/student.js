const Joi = require('joi');
const validator = require('../utils/validator');

const studentModel = require("../models/student");
const CustomError = require("../utils/customError");

exports.getStudentList = async () => {
    const studentList = await studentModel.getStudentList();
    if(studentList.length == 0) {
        throw new CustomError(`There's no student`, 400);
    }

    return studentList;
}

exports.setStudent = async (student) => {

    const emailCheck = await studentModel.checkStudentEmail(student.email);
    if(emailCheck.length > 0) {
        throw new CustomError(`${student.email}: This email has aleady registered`, 400);
    }

    const results = await studentModel.setStudent(student);
    student.studentId = results.studentId;
    return student;
}

exports.deleteStudent = async (id) => {

    const studentCheck = await studentModel.getStudent(id);
    if(studentCheck.length == 0) {
        throw new CustomError(`${id}: There's no student in this id.`, 400);
    }

    const dbResult = await studentModel.deleteStudent(id);
    return {
        affectedRows: dbResult.affectedRows,
        message: 'succesfully deleted.'
    }
}