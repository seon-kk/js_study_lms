const categoryModel = require("../models/category");

exports.getCategoryList = async function() {
    const categoryList = await categoryModel.getCategoryList();
    return categoryList;
};
