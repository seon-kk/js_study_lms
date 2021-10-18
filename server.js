const express = require("express");
const app = express();

const config = require("config");
const dbConfig = config.get("dbConfig");

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/', routes);


app.listen(8080, () => {
    console.log('start');
});