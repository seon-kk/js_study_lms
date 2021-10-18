const {
    assert,
    expect
} = require("chai");
const supertest = require("supertest");
const server = supertest.agent('http://localhost:8080');

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('API Flow Test', async function () {

    //랜덤 강의 개설하기
    const insertLecture = {
        teacherId: 1,
        categoryId: 1,
        subject: `플로우 테스트 강의 ${randomNum(100, 1000)}`,
        content: `플로우 테스트 강의 소개`,
        price: randomNum(1000, 10000)
    }
    let lectureId;

    it('POST /lecture : 강의 개설', await
        function (done) {
            server.post('/lecture')
                .send(insertLecture)
                .expect(200)
                .end((err, res) => {
                    lectureId = res.body.lectureId;
                    return done();
                });
        });

    //랜덤 이름 수강생 가입
    const insertStudent = {
        name: `수강생 ${randomNum(100, 1000)}`,
        email: `email${randomNum(100, 1000)}@email.com`
    }
    let studentId;

    it('POST /student : 수강생 가입', await
        function (done) {
            server.post('/student')
                .send(insertStudent)
                .expect(200)
                .end((err, res) => {
                    studentId = res.body.studentId;
                    return done();
                });
        });



    //개설한 강의 공개 전환
    it('PUT /lecture/visible: 개설한 강의 공개 전환', await
        function (done) {
            server.put(`/lecture/visible/${lectureId}`)
                .send()
                .expect(200).end((err, res) => {
                    return done();
                });;
        });


    

    it('POST /enrollment: 생성한 강의에 생성한 수강생으로 수강신청하기', await
        function (done) {
            //공개 전환한 강의에 수강신청하기
            const insertEnroll = [{
                studentId: studentId,
                lectureId: lectureId
            }];
            console.log(insertEnroll);
            server.post('/enrollment')
                .send(insertEnroll)
                .expect(200).end((err, res) => {
                    done();
                });;
        });


    //강의 리스트 조회
    it('GET /lecture : 등록한 수강생으로 강의 리스트 조회', await function (done) {
        server.get('/lecture')
            .expect(200)
            .query({studentId: studentId})
            .end((err, res) => {
                console.log(res.body)
                done();
            });
    });

    //강의 상세조회
    it('GET /lecture : 생성한 강의 리스트 상세조회', await function (done) {
        server.get(`/lecture/${lectureId}`)
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                done();
            });
    });

});