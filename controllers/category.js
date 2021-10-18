const categoryService = require("./../services/category");
const CustomError = require("../utils/customError");

exports.getCategoryList = async function (req, res, next) {
    try {
        return res.json(await categoryService.getCategoryList());
    } catch (error) {
        console.error(error);

        if(error instanceof CustomError) {
            return res.status(error.status).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
}