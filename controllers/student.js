const Joi = require('joi');
const validator = require('../utils/validator');

const studentService = require("./../services/student");
const CustomError = require("../utils/customError");


exports.getStudentList = async (req, res, next) => {
    try {
        return res.json(await studentService.getStudentList());
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.setStudent = async (req, res, next) => {
    try {
        const student = Joi.attempt(req.body, validator.student);
        return res.json(await studentService.setStudent(student));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.deleteStudent = async (req, res, next) =>{
    try {
        const id = req.params.studentId;
        Joi.assert(id, validator.id);
        return res.json(await studentService.deleteStudent(id));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}