const { addSlashes, stripSlashes } = require('slashes');

async function AddTasks(req,res,next){
    let description   = addSlashes(req.body.description);
    let due_date   = addSlashes(req.body.due_date);
    console.log(req.body.relevant_mStone);
    let relevant_mStone = (req.body.relevant_mStone === undefined) ? [] : req.body.relevant_mStone;

    let Query = `INSERT INTO tasks (description,due_date) VALUES('${description}','${due_date}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;

        if(relevant_mStone.length > 0){
            Query = "INSERT INTO tasks_milestones ";
            Query += "(task_id,milestone_id,status) VALUES ";
            for(let milestone_id of relevant_mStone) {
                Query += `(${rows.insertId},${milestone_id},1),`;
            }
            Query=Query.slice(0,-1);
            console.log(Query);
            await promisePool.query(Query);
        }

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
            // rows[idx].due_date= htmlspecialchars(stripSlashes(rows[idx].due_date));
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