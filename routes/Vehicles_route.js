const express = require('express');
const router = express.Router()
const Vehicles = require('../models/Vehicles_models');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

 
// router.post('/destination/insert',auth.verifyUser, auth.verifyAdmin, function(req,res){
router.post('/vehicle/insert',upload.single('vimage'),function(req,res, next){ 
console.log(req.file);
    const vimage = req.file.filename;
    const vname = req.body.vname;
    const vdetails = req.body.vdetails;
    const vprice = req.body.vprice;
    
    if(req.file == undefined)
    {
        res.status(401).json({"success":false,"message":"Invalid File"})
    }
    else
    {
        const Vehicledata = new Vehicles({ vimage : vimage,vname: vname, vdetails: vdetails, vprice: vprice})
    Vehicledata.save()
 
    .then(function(result){
        res.status(201).json({message : "Vehicle inserted!!", success: true,data:result})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
    }
    
})
 
//Update
// id - updated data from user
router.put('/vehicle/update/:id', function(req,res){
    //const vimage = req.file.path;
    //console.log(req.body.vname)
    const vname = req.body.vname;
    const vdetails = req.body.vdetails;
    const vprice = req.body.vprice;
    const id = req.body.id;
    Vehicles.updateOne({_id:id}, {
       // vimage : vimage,
        vname : vname,
        vdetails : vdetails,
        vprice : vprice
      
    })
    .then (function(result){
        res.status(200).json({message : "Updated!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

 
//Delete
router.delete('/vehicle/delete/:id', function(req,res){
    const id = req.params.id;
    Vehicles.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({message : "Deleted!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})
 
router.get('/vehicle/showall', function(req,res){
    Vehicles.find()
    .then(function(data){
        //console.log(data)
        res.status(200).json({success: true, data: data})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})
 
router.get('/vehicle/single/:id', function(req,res){
    const id = req.params.id;
    Vehicles.findOne({_id : id})
    .then(function(data){
        res.status(200).json(data)
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})
module.exports = router;