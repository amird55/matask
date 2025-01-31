const { addSlashes, stripSlashes } = require('slashes');

async function GetMaxOrdr(){
    let Query = "SELECT MAX(ordr) AS mx FROM tasks";
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0){
            return rows[0].mx;
        }
        return 0;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
}
async function AddTasks(req,res,next){
    let LastVal = 1+GetMaxOrdr();
    let description     = (req.body.description     === undefined)  ?      "" : addSlashes(req.body.description );
    let due_date        = (req.body.due_date        === undefined)  ?      "" : addSlashes(req.body.due_date    );
    let worker_id       = (req.body.worker_id       === undefined)  ?      -1 : parseInt(req.body.worker_id     );
    let categ_id        = (req.body.categ_id        === undefined)  ?      -1 : parseInt(req.body.categ_id      );
    let progress_prcnt  = (req.body.progress_prcnt  === undefined)  ?       0 : parseInt(req.body.progress_prcnt);
    let is_arsal        = (req.body.is_arsal        === undefined)  ?       0 : parseInt(req.body.is_arsal      );
    let parent_id       = (req.body.parent_id       === undefined)  ?      -1 : parseInt(req.body.parent_id     );
    let ordr            = (req.body.ordr            === undefined)  ? LastVal : parseInt(req.body.ordr          );
    console.log(req.body.relevant_mStone);
    let relevant_mStone = (req.body.relevant_mStone === undefined) ? [] : req.body.relevant_mStone;

    let Query = `INSERT INTO tasks `;
    Query += "(`description`, `due_date`, `worker_id`, `categ_id`, `progress_prcnt`, `is_arsal`, `parent_id`, `ordr`)";
    Query += " VALUES ";
    Query += `('${description}','${due_date}','${worker_id}','${categ_id}','${progress_prcnt}','${is_arsal}','${parent_id}','${ordr}')`;
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
    let Query = 'SELECT *';
     Query   += ',DATE_FORMAT(due_date,"%d-%m-%Y") AS nice_due  ';
     Query   += ' FROM tasks ';
     Query   += ' ORDER BY ordr ASC ';
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
async function ChangeWorker(req,res,next){
    let idx    = parseInt(req.body.idx);
    if(req.body.worker_id  !== undefined) {
        let worker_id =  parseInt(req.body.worker_id);
        let Query = `UPDATE tasks SET `;
        Query += ` worker_id      = '${worker_id}' `;
        Query += ` WHERE id = ${idx} `;

        const promisePool = db_pool.promise();
        let rows=[];
        try {
            [rows] = await promisePool.query(Query);
            req.success=true;
        } catch (err) {
            req.success=false;
            console.log(err);
        }
    }

    next();
}
async function ChangeOrder(req,res,next){
    let idx    = parseInt(req.body.idx);
    let old_ordr    = parseInt(req.body.old_ordr);
    let new_ordr    = parseInt(req.body.new_ordr);

    // פינוי מקום
    let Query = `UPDATE tasks SET `;
    Query += ` ordr      = ordr+1 `;
    if(new_ordr < old_ordr) {
        Query += ` WHERE ordr >= ${new_ordr} AND ordr <= ${old_ordr} `;
    } else {
        Query += ` WHERE ordr >= ${old_ordr} AND ordr <= ${new_ordr} `;
    }

    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        let Query = `UPDATE tasks SET `;
        Query += ` ordr      = ${new_ordr} `;
        Query += ` WHERE id = ${idx} `;
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }


    next();
}
async function ChangeMileStoneVal(req,res,next){
    let task_id       = (req.params.task_id      === undefined)  ?  -1 : parseInt(req.params.task_id      );
    let milestone_id  = (req.params.milestone_id === undefined)  ?  -1 : parseInt(req.params.milestone_id );
    let status        = (req.params.status       === undefined)  ?   1 : parseInt(req.params.status       );
    if((task_id > 0)&&(milestone_id >0)) {
        let Query = `UPDATE tasks_milestones SET `;
        Query += ` status      = '${status}' `;
        Query += ` WHERE task_id = ${task_id} AND milestone_id = ${milestone_id}`;

        const promisePool = db_pool.promise();
        let rows=[];
        try {
            [rows] = await promisePool.query(Query);
            req.success=true;
        } catch (err) {
            req.success=false;
            console.log(err);
        }
    }

    next();
}
async function UpdateTasks(req,res,next){
    let idx    = parseInt(req.body.idx);
    let LastVal = 1+GetMaxOrdr();
    let description     = (req.body.description     === undefined)  ?      "" : addSlashes(req.body.description );
    let due_date        = (req.body.due_date        === undefined)  ?      "" : addSlashes(req.body.due_date    );
    let worker_id       = (req.body.worker_id       === undefined)  ?      -1 : parseInt(req.body.worker_id     );
    let categ_id        = (req.body.categ_id        === undefined)  ?      -1 : parseInt(req.body.categ_id      );
    let progress_prcnt  = (req.body.progress_prcnt  === undefined)  ?       0 : parseInt(req.body.progress_prcnt);
    let is_arsal        = (req.body.is_arsal        === undefined)  ?       0 : parseInt(req.body.is_arsal      );
    let parent_id       = (req.body.parent_id       === undefined)  ?      -1 : parseInt(req.body.parent_id     );
    let ordr            = (req.body.ordr            === undefined)  ? LastVal : parseInt(req.body.ordr          );

    let Query = `UPDATE tasks SET `;
    Query += ` worker_id      = '${worker_id     }', `;
    Query += ` categ_id       = '${categ_id      }', `;
    Query += ` progress_prcnt = '${progress_prcnt}', `;
    Query += ` is_arsal       = '${is_arsal      }', `;
    Query += ` parent_id      = '${parent_id     }', `;
    Query += ` ordr           = '${ordr          }', `;
    Query += ` description    = '${description   }', `;
    Query += ` due_date       = '${due_date      }' `;
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
    AddTasks            : AddTasks,
    ReadTasks           : ReadTasks,
    UpdateTasks         : UpdateTasks,
    DeleteTasks         : DeleteTasks,
    ChangeWorker        : ChangeWorker,
    ChangeMileStoneVal  : ChangeMileStoneVal,
    ChangeOrder         : ChangeOrder,
}