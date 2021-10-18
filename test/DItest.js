const chai = require("chai");
const assert = require("assert");
const expect = chai.expect;

/*
Awilix를 이용해 module 형태로 dbConnection, select가 가능한지 테스트
*/

const awilix = require('awilix');
const container = awilix.createContainer();

container.loadModules([
    'models/teacher2.js'
], {
    resolverOptions: {
        lifetime: awilix.Lifetime.SINGLETON,
        register: awilix.asClass
    }
});

const db = require("../models/connection");
const teacherModel = new container.resolve('teacher2');

describe('DB', function () {
    //DB Connection TEST
    it('DB Connection', async function () {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        assert.equal(rows[0].solution, 2);
    });
        

    //teacher list test
    it('Teacher Select', async function () {
        const result = await teacherModel.getTeacherList();
        console.log(result);
        expect(result.length).to.be.above(1);
    });

});
