const express = require("express");
const routes = express.Router();
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const teacher = require("./teacher");
routes.use('/teacher', teacher);

const student = require("./student");
routes.use('/student', student);

const lecture = require("./lecture");
routes.use('/lecture', lecture);

const enrollment = require("./enrollment");
routes.use('/enrollment', enrollment);

const category = require("./category");
routes.use('/category', category);

/* swagger_ui*/
const swaggerSpec = yaml.load("./swagger.yml");
routes.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = routes;