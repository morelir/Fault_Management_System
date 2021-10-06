const express = require("express");
const router = express.Router();
const {FoodModel,validFood} = require("../models/foodModel");




router.get("/", async(req,res) => {

    let data = await FoodModel.find({});
    res.json(data);
   
})

router.post("/", async(req,res) => {
    let validBody = validFood(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    let food = new FoodModel(req.body);
    await food.save();//שומר את המידע ב db
    res.json(food);
})

router.delete("/:idDel",async(req,res)=>{//delete-מחיקה
    try{
        let data = await FoodModel.deleteOne({_id:req.params.idDel});
        //אם יש הצלחה נקבל מאפיין של אן שווה 1
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

router.put("/:idEdit",async(req,res)=>{//put-עריכה
    let validBody = validFood(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let data = await FoodModel.updateOne({_id:req.params.idEdit},req.body);
        //אם יש הצלחה נקבל מאפיין של אן שווה 1
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})


module.exports = router;