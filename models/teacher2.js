const {
    RESOLVER
} = require('awilix');

const db = require("./connection");

class TeacherModel {
    async getTeacherList() {
        const [rows] = await db.query('SELECT * FROM teacher');
        return rows;
    }

    async getTeacher(id) {
        const [rows] = await db.query('SELECT * FROM teacher WHERE id = ?', id);
        return rows;
    }

    async getTeacherByName(name) {
        const [rows] = await db.query('SELECT * FROM teacher WHERE name like "%?%"', name);
        return rows;
    }
}

module.exports.default = TeacherModel;