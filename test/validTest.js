const {
    assert,
    expect
} = require("chai");

const Joi = require("joi");
const validator = require('../utils/validator');

const testStudent = [{
    name: '학생1',
    email: 'a1@b.cd'
}, {
    name: '',
    email: 'a2@b.cd'
}, {
    name: '학생2',
    email: ''
}];

const lectureInsert = [{
    teacherId: 4,
    categoryId: 3,
    subject: "게임 강의 1",
    content: "게임 강의 1의 소개입니다.",
    price: 5000
},{
    teacherId: 4,
    content: "게임 강의 1의 소개입니다.",
    price: 5000
}];

const lectureSearch = [{
    page: 'a',
    row: 10,
    order: 'new',
    teacherName: '김',
    subject: 'subject',
    studentId: 1,
    category: '앱'
},{
    page: 1,
    row: 10,
    order: 'new',
    teacherName: '김',
    subject: 'subject',
    studentId: 'a',
    category: '앱'
},{
    teacherName: '김'
}];


describe('validation test', function () {
    describe('student insert data', function () {
        //학생 입력시 validation test
        it('ok', function () {
            expect(() => Joi.assert(testStudent[0], validator.student)).to.not.throw();
        });

        it('name - fail', function () {
            expect(() => Joi.assert(testStudent[1], validator.student)).to.throw();
        });

        it('email - fail', function () {
            expect(() => Joi.assert(testStudent[2], validator.student)).to.throw();
        });
    });

    describe('lecture insert data', function () {
        it('lecture insert ok', function () {
            expect(() => Joi.assert(lectureInsert[0], validator.lecture.insert)).to.not.throw();
        });
        it('lecture insert not ok', function () {
            expect(() => Joi.assert(lectureInsert[1], validator.lecture.insert)).to.throw();
        });
    });


    describe('lecture search data', function () {
        it('lecture search not ok', function () {
            expect(() => Joi.assert(lectureSearch[0], validator.lecture.search)).to.throw();
        });
        it('lecture search not ok', function () {
            expect(() => Joi.assert(lectureSearch[1], validator.lecture.search)).to.throw();
        });
        it('lecture search ok', function () {
            expect(() => Joi.assert(lectureSearch[2], validator.lecture.search)).to.not.throw();
        });
    });
});