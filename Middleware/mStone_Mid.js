const {addSlashes} = require("slashes/lib");
const {stripSlashes} = require("slashes");

async function AddMilestone(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO milestone (name) VALUES('${name}')`;
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
async function ReadMilestone(req,res,next){
    const Query = `SELECT * FROM milestone `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
        }
        req.success=true;
        req.milestone_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateMilestone(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE milestone SET `;
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
async function DeleteMilestone(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM milestone  `;
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
    AddMilestone: AddMilestone,
    ReadMilestone:ReadMilestone,
    UpdateMilestone:UpdateMilestone,
    DeleteMilestone:DeleteMilestone,
}