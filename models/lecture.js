const CustomError = require("../utils/customError");
const db = require("./connection");


exports.getLecture = async (id) => {
    const [rows] = await db.query('SELECT * FROM lecture WHERE id = ?', id);
    return rows;
};


exports.getLectureDetail = async (id) => {
    const query = `
        SELECT l.*, c.name as category, count(e.id) as totalStudent
        FROM lecture as l
        JOIN category as c ON (c.id = l.categoryId)
        LEFT JOIN enrollment as e ON (e.lectureID = l.id)
        WHERE l.id = ?`;

    let [rows] = await db.query(query, id);

    return rows;
};

exports.getLectureList = async (search) => {
    let query = `
        SELECT l.id, j.name as category, t.name as teacherName,
            l.subject, l.price, l.createdAt, COUNT(e.id) as totalStudent
        FROM lecture as l
        JOIN category as j ON (j.id = l.categoryId)
        JOIN teacher as t ON (t.id = l.teacherId)
        LEFT JOIN enrollment as e ON (e.lectureId = l.id)
    `;
    let wheres = ` WHERE l.visibility = 1 `;
    let limits = `limit ${search.page - 1}, ${search.row}`;
    let groupby = ` GROUP BY l.id `;

    let orders;
    if(search.order == 'new') {
        orders = ` ORDER BY l.id DESC `;
    } else if(search.order == 'count') {
        orders = ` ORDER BY COUNT(e.id) DESC `;
    }

    if(search.teacherName) {
        wheres += ` AND t.name like "%${search.teacherName}%" `;
    }
    if(search.subject) {
        wheres += ` AND l.subject like "%${search.subject}%" `;
    }
    if(search.category) {
        wheres += ` AND j.name like "%${search.category}%" `;
    }
    if(search.studentId) {
        wheres += ` AND e.studentId = ${search.studentId} `; 
    }


    const [totalResult = rows] = await db.query(query + wheres + groupby);
    const [pagedResult = rows] = await db.query(query + wheres + groupby + orders + limits);

    return {
        totalCount: totalResult.length,
        pagedResult: pagedResult
    };
};


exports.setLecture = async (lecture) => {
    const results = await db.query('INSERT INTO lecture set ?', lecture);
    
    return {
        lectureId: results[0].insertId
    };
}

exports.modifyLecture = async (lectureId, lecture) => {
    const results = await db.query('UPDATE lecture set ? where id = ?', [lecture, lectureId]);
    
    return {
        changedRows: results[0].changedRows
    };
}

exports.lectureVisible = async (id) => {
    const results = await db.query('UPDATE lecture set visibility = 1 where id = ?', id);
    
    return {
        changedRows: results[0].changedRows
    };
}

exports.deleteLecture = async (id) => {
    const result = await db.query('DELETE FROM lecture WHERE id = ?', id);

    return result[0];
}