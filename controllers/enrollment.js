const Joi = require('joi');
const validator = require('../utils/validator');

const enrollmentService = require("./../services/enrollment");
const CustomError = require("../utils/customError");

exports.setEnrollment = async (req, res, next) => {
    try {
        const enrollList = Joi.attempt(req.body, validator.enrollment);

        return res.json(await enrollmentService.setEnrollment(enrollList));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}