const teacherService = require("./../services/teacher");
const CustomError = require("../utils/customError");

exports.getTeacherList = async function (req, res, next) {
    try {
        return res.json(await teacherService.getTeacherList());
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}