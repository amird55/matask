const express = require('express');
const router = express.Router();
module.exports = router;

const tasks_Mid=require("../middleware/tasks_Mid");

router.put("/ChangeOwner",[tasks_Mid.ChangeWorker], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
})
router.post('/',[tasks_Mid.AddTasks], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});
router.get('/',[tasks_Mid.ReadTasks], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json({msg:"ok",data:req.tasks_data});
    } else {
        return res.status(500).json({message: err});
    }

});
router.put('/', [tasks_Mid.UpdateTasks], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
router.delete('/',[tasks_Mid.DeleteTasks], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
