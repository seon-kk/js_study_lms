const teacherModel = require("../models/teacher");

exports.getTeacherList = async function() {
    const teacherList = await teacherModel.getTeacherList();
    return teacherList;
};
