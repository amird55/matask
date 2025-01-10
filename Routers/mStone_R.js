const express = require('express');
const router = express.Router();
module.exports = router;

const mStone_Mid=require("../middleware/mStone_Mid");

router.post('/',[mStone_Mid.AddMilestone], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});
router.get('/',[mStone_Mid.ReadMilestone], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json({msg:"ok",data:req.kitot_data});
    } else {
        return res.status(500).json({message: err});
    }

});
router.put('/', [mStone_Mid.UpdateMilestone], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
router.delete('/',[mStone_Mid.DeleteMilestone], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
