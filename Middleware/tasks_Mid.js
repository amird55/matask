const { addSlashes, stripSlashes } = require('slashes');

async function AddTasks(req,res,next){
    let description   = addSlashes(req.body.description);
    let due_date   = addSlashes(req.body.due_date);

    const Query = `INSERT INTO tasks (description,due_date) VALUES('${description}','${due_date}')`;
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
async function ReadTasks(req,res,next){
    const Query = `SELECT * FROM tasks `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].description= htmlspecialchars(stripSlashes(rows[idx].description));
            rows[idx].due_date= htmlspecialchars(stripSlashes(rows[idx].due_date));
        }
        req.success=true;
        req.tasks_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateTasks(req,res,next){
    let idx    = parseInt(req.body.idx);
    let description   = addSlashes(req.body.description);
    let due_date   = addSlashes(req.body.due_date);

    let Query = `UPDATE tasks SET `;
    Query += ` description = '${description}', `;
    Query += ` due_date = '${due_date}' `;
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
async function DeleteTasks(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM tasks  `;
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
    AddTasks: AddTasks,
    ReadTasks:ReadTasks,
    UpdateTasks:UpdateTasks,
    DeleteTasks:DeleteTasks,
}