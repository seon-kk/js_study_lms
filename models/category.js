const CustomError = require("../utils/customError");
const db = require("./connection");


exports.getCategory = async function(id) {
    const [rows] = await db.query('SELECT * FROM category where id = ?', id);
    return rows;
}

exports.getCategoryList = async function() {
    const [rows] = await db.query('SELECT * FROM category ORDER BY id ASC');
    return rows;
}

