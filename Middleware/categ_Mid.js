const { addSlashes, stripSlashes } = require('slashes');

async function AddCategories(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO categories (name) VALUES('${name}')`;
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
async function ReadCategories(req,res,next){
    const Query = `SELECT * FROM categories `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.categ_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.categ_by_id[rows[idx].id] = rows[idx].name;
        }
        req.success=true;
        req.categories_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateCategories(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE categories SET `;
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
async function DeleteCategories(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM categories  `;
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
    AddCategories: AddCategories,
    ReadCategories:ReadCategories,
    UpdateCategories:UpdateCategories,
    DeleteCategories:DeleteCategories,
}