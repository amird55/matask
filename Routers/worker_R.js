const express = require('express');
const router = express.Router();
module.exports = router;

const worker_Mid=require("../middleware/worker_Mid");

router.post('/',[worker_Mid.AddWorkers], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});
router.get('/',[worker_Mid.ReadWorkers], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json(
            {
                msg         :"ok",
                data        :req.workers_data,
                worker_by_id:req.worker_by_id,
            });
    } else {
        return res.status(500).json({message: err});
    }

});
router.put('/', [worker_Mid.UpdateWorkers], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
router.delete('/',[worker_Mid.DeleteWorkers], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
