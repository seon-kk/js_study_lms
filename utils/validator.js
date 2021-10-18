const Joi = require('joi');
const CustomError = require('./customError');

//고유 ID
exports.id = Joi.number().integer().positive().required()
    .error(new CustomError(`ValidationError: id`, 400));

//수강생
exports.student = Joi.object({
    //수강생 이름: 문자열, 2~100자
    name: Joi.string().min(2).max(100).required()
        .error(new CustomError(`ValidationError: name`, 400)),

    //수강생 이메일
    email: Joi.string().email().required()
        .error(new CustomError(`ValidationError: email`, 400))
});

//강의 정보
exports.lecture = {
    //강의 정보 입력시
    insert: Joi.object({
        //교사 ID
        teacherId: Joi.number().integer().positive().required()
            .error(new CustomError(`ValidationError: teacherId`, 400)),
        //강의 분류
        categoryId: Joi.number().integer().positive().required()
            .error(new CustomError(`ValidationError: teacherId`, 400)),
        //제목
        subject: Joi.string().min(2).max(400).required()
            .error(new CustomError(`ValidationError: subject`, 400)),
        //과정 소개 : 공백 가능
        content: Joi.string().min(2).max(1000)
            .error(new CustomError(`ValidationError: content`, 400)),
        //과정 가격
        price: Joi.number().integer().min(0).max(9999999).required()
            .error(new CustomError(`ValidationError: price`, 400))
    }),
    //강의 정보 수정시
    modify: Joi.object({
        //강의 ID
        lectureId: Joi.number().integer().positive().required()
            .error(new CustomError(`ValidationError: lectureId`, 400)),
        //제목
        subject: Joi.string().min(2).max(400)
            .error(new CustomError(`ValidationError: subject`, 400)),
        //과정 소개
        content: Joi.string().min(2).max(1000)
            .error(new CustomError(`ValidationError: content`, 400)),
        //과정 가격
        price: Joi.number().integer().min(0).max(9999999)
            .error(new CustomError(`ValidationError: price`, 400))
    }),
    //강의 검색시
    search: Joi.object({
        //페이지 번호
        page: Joi.number().integer().positive().default(1)
            .error(new CustomError(`ValidationError: page`, 400)),
        //페이지 당 결과 수
        row: Joi.number().integer().positive().default(20)
            .error(new CustomError(`ValidationError: row`, 400)),
        //정렬 순서
        order: Joi.string().min(2).max(10).default('new')
            .error(new CustomError(`ValidationError: order`, 400)),
        //강사명
        teacherName: Joi.string().min(1).max(100)
            .error(new CustomError(`ValidationError: teacherName`, 400)),
        //강의 제목
        subject: Joi.string().min(1).max(100)
            .error(new CustomError(`ValidationError: subject`, 400)),
        //카테고리
        category: Joi.string().min(1).max(100)
            .error(new CustomError(`ValidationError: category`, 400)),
        //studentId
        studentId: Joi.number().integer().positive()
            .error(new CustomError(`ValidationError: studentId`, 400))
    })
};

//수강신청
exports.enrollment = Joi.array().min(1).items(
    Joi.object({
        //수강생 ID
        studentId: Joi.number().integer().positive().required()
            .error(new CustomError(`ValidationError: studentId`, 400)),
        //강의 ID
        lectureId: Joi.number().integer().positive().required()
            .error(new CustomError(`ValidationError: lectureId`, 400))
    })
);