const express = require('express');
const router = express.Router();
module.exports = router;

const categ_Mid=require("../middleware/categ_Mid");

router.post('/',[categ_Mid.AddCategories], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});
router.get('/',[categ_Mid.ReadCategories], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json(
            {
                msg             :"ok",
                categ_by_id     :req.categ_by_id,
                data            :req.categories_data,
            });
    } else {
        return res.status(500).json({message: err});
    }

});
router.put('/', [categ_Mid.UpdateCategories], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
router.delete('/',[categ_Mid.DeleteCategories], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});
