// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0  swagger-autogen swagger-ui-express
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

app.use("/CSS1",express.static(path.join(__dirname, "css")));
app.use("/js",express.static(path.join(__dirname, "js")));

global.htmlspecialchars = require('htmlspecialchars');
// const { addSlashes, stripSlashes } = require('slashes');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'תוכנת משימות מעולה'
    },
    host: `localhost:${port}`
};

const swaggerOutputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(swaggerOutputFile, routes, doc);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(swaggerOutputFile);

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const Pages_R = require('./Routers/Pages_R');
app.use('/',Pages_R);
const categ_R = require('./Routers/categ_R');
app.use('/C/',categ_R);
const worker_R = require('./Routers/worker_R');
app.use('/W/',worker_R);
const mStone_R = require('./Routers/mStone_R');
app.use('/S/',mStone_R);
const tasks_R = require('./Routers/tasks_R');
app.use('/T/',tasks_R);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
