const Joi = require('joi');
const validator = require('../utils/validator');

const lectureService = require("./../services/lecture");
const CustomError = require("../utils/customError");

exports.getLectureList = async (req, res, next) => {
    try {
        const search = Joi.attempt(req.query, validator.lecture.search);
        return res.json(await lectureService.getLectureList(search));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.getLectureDetail = async (req, res, next) => {
    try {
        const id = req.params.lectureId;
        Joi.assert(id, validator.id);
        
        return res.json(await lectureService.getLectureDetail(id));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}


exports.deleteLecture = async (req, res, next) => {
    try {
        const id = req.params.lectureId;
        Joi.assert(id, validator.id);

        return res.json(await lectureService.deleteLecture(id));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.setLecture = async (req, res, next) => {
    try {
        const lecture = Joi.attempt(req.body, validator.lecture.insert);

        return res.json(await lectureService.setLecture(lecture));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.modifyLecture = async (req, res, next) => {
    try {
        const lecture = Joi.attempt(req.body, validator.lecture.modify);

        return res.json(await lectureService.modifyLecture(lecture));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}

exports.lectureVisible = async (req, res, next) => {
    try {
        const id = req.params.lectureId;
        Joi.assert(id, validator.id);

        return res.json(await lectureService.lectureVisible(id));
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}