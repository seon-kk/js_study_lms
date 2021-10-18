const CustomError = require("../utils/customError");
const db = require("./connection");


exports.checkStudentEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM student WHERE email = ?', email);
    return rows;
}

exports.getStudent = async (studentId) => {
    const [rows] = await db.query('SELECT * FROM student where id = ?', studentId);
    return rows;
}

exports.getStudentList = async () => {
    const [rows] = await db.query('SELECT * FROM student');
    return rows;
}


exports.setStudent = async (student) => {
    const results = await db.query('INSERT INTO student set ?', student);
    return {
        studentId: results[0].insertId
    }
}

exports.deleteStudent = async (id) => {
    const result = await db.query('DELETE FROM student WHERE id = ?', id);

    return result[0];
}
