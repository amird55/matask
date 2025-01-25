const { addSlashes, stripSlashes } = require('slashes');

async function AddWorkers(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO workers (name) VALUES('${name}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}
async function ReadWorkers(req,res,next){
    const Query = `SELECT * FROM workers `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.worker_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.worker_by_id[rows[idx].id]=rows[idx].name;
        }
        req.success=true;
        req.workers_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateWorkers(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE workers SET `;
    Query += ` name = '${name}' `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function DeleteWorkers(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM workers  `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

module.exports = {
    AddWorkers: AddWorkers,
    ReadWorkers:ReadWorkers,
    UpdateWorkers:UpdateWorkers,
    DeleteWorkers:DeleteWorkers,
}