const CustomError = require("../utils/customError");
const db = require("./connection");

exports.setEnrollment = async (list) => {
    let dbResult = {
        success: 0
    }
    const query = `INSERT INTO enrollment set ?`;

    for (const l of list) {
        const result = await db.query(query, l);
        dbResult.success++;
    }

    return dbResult;
};

exports.getEnrollment = async (studentId, lectureId) => {
    const query = `
        SELECT * FROM enrollment
        WHERE studentId = ? AND lectureId = ?
    `;

    const [rows] = await db.query(query, [studentId, lectureId]);
    return rows;
}


exports.getStudentByEnroll = async (lectureId) => {
    const query = `
        SELECT s.id, s.name, e.createdAt as enrolledAt
        FROM enrollment as e
        JOIN student as s ON (e.studentId = s.id)
        WHERE e.lectureId = ?
    `;

    const [rows] = await db.query(query, lectureId);
    return rows;
}