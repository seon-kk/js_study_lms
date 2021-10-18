const db = require("./connection");


exports.getTeacherList = async () => {
    const [rows] = await db.query('SELECT * FROM teacher');
    return rows;
}

exports.getTeacher = async (id) => {
    const [rows] = await db.query('SELECT * FROM teacher WHERE id = ?', id);
    return rows;
}

exports.getTeacherByName = async (name) => {
    const [rows] = await db.query('SELECT * FROM teacher WHERE name like "%?%"', name);
    return rows;
}