const CustomError = require("../utils/customError");

const enrollmentModel = require("../models/enrollment");
const lectureModel = require("../models/lecture");
const studentModel = require("../models/student");

exports.setEnrollment = async (list) => {

    let failedResult = {
        validation: true,
        noStudent: [],
        noLecture: [],
        invisibleLecture: [],
        enrolled: []
    };

    for (const enroll of list) {
        //studentId, lectureId 유효성 확인
        const studentCheck = await studentModel.getStudent(enroll.studentId);
        if(studentCheck.length == 0) {
            failedResult.validation = false;
            failedResult.noStudent.push(enroll.studentId);
        }

        const lectureCheck = await lectureModel.getLecture(enroll.lectureId);
        if(lectureCheck.length == 0) {
            failedResult.validation = false;
            failedResult.noLecture.push(enroll.lectureId);
        } else if(lectureCheck[0].visibility != 1) {
            failedResult.validation = false;
            failedResult.inisibleLecture.push(enroll.lectureId);
        }

        //이미 수강신청되어 있는 과목인지 확인
        const enrollCheck = await enrollmentModel.getEnrollment(enroll.studentId, enroll.lectureId);
        if(enrollCheck.length > 0) {
            failedResult.validation = false;
            failedResult.enrolled.push(enroll);
        }
    }

    if(!failedResult.validation) {
        throw new CustomError(failedResult, 400);
    }

    const enrollmentList = await enrollmentModel.setEnrollment(list);
    return enrollmentList;
}