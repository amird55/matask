// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0
const port = 7291;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

let db_M = require('./database');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "/views"));

var htmlspecialchars = require('htmlspecialchars');
const { addSlashes, stripSlashes } = require('slashes');


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
