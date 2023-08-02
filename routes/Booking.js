const express = require('express');
const router = express.Router()
const Mybooking = require('../models/Booking_model');
const {verifyUser} = require('../middleware/auth');
const upload = require('../middleware/upload');


// router.post('/vehicle/book',verifyUser, function(req,res){
//   // console.log("Asdasdasdasdasd")  
//   console.log(req.User._id)
 

//   const Vehicle = new MyTours({
//           UserId:req.User._id,
//           Destination:req.body._id,
//           Person:req.body.Person
//       })
//   Tours.save().then(function(result){
//           res.status(200).json({
//               success:true, data:"Booked One Destination"
//           })
//       })
//   })
// //delete 
// router.delete("/Mybooking/delete/:id",verifyUser,function (req, res) {
//       const id = req.params.id;
//       Mybooking.deleteOne({ _id: id })
//         .then(function (result) {
//           res.status(200).json({success: true, message: "User deleted" });
//         })
//         .catch(function (err) {
//           res.status(500).json({ error: err });
//         });
//     }
//   );

//   router.put('/Mybooking/minus/:id', function(req,res){
//     const id = req.params.id;
  
//     Mybooking.findOne({_id : id}).then(function(result) {
//       let qty = result.Qty; 
//       Mybooking.findByIdAndUpdate({_id: id}, {$set:{
//         Qty : qty-1
//       }}).then(function(result){
        
//         res.status(200).json({ success : true, data : result})
//       })
//     }).catch((err)=>{
//       res.status(404).json({ success : true, message : err})
//     })
   
   
//   }) 

//   router.put('/Mybooking/update/:id',verifyUser, function(req,res){
//     const id = req.params.id;
//     const Qty = req.body.Qty;
//     console.log(Qty)
//     Mybooking.updateOne({_id : id}, {
//         Qty : Qty
//     })
//     .then (function(result){
//       console.log("success")
//         res.status(200).json({success : true, message : "Updated!!", data : result})
//     })
//     .catch(function(e){
//         console.log("err")
//         res.status(500).json({error : e})
//     })
//   })



// module.exports = router

// router.post('/vehicle/book',verifyUser, function(req,res){
//   // console.log("Asdasdasdasdasd")  
//   console.log(req.User._id)
 

//   const Vehicle = new MyVehicle({
//           UserId:req.User._id,
//           Vehicle:req.body._id,
//           Qty:req.body.Qty
//       })
//       Vehicle.save().then(function(result){
//           res.status(200).json({
//               success:true, data:"Booked One Vehicle"
//           })
//       })
//   })
  
// // display Booking
// router.get('/vehicle/showall',verifyUser,function(req,res){

//   MyVehicle.find()
//   .populate("Vehicle")
//   .then((function(data){
//       console.log(data)
//       res.status(200).json({success :true, data:data})
//   }))

//   })


// //delete 
// router.delete("/vehicle/delete/:id",verifyUser,function (req, res) {
//     const id = req.params.id;
//     MyVehicle.deleteOne({ _id: id })
//       .then(function (result) {
//         res.status(200).json({ success : true, message: "Vehicle deleted" });
//       })
//       .catch(function (err) {
//         res.status(500).json({ error: err });
//       });
//   }
// );


// //update ++
router.put('/myBooking/add/:id', function(req,res){
  const id = req.params.id;

  Mybooking.findOne({_id : id}).then(function(result) {
    let qty = result.Qty; 
    Mybooking.findByIdAndUpdate({_id: id}, {$set:{
      Qty : qty+1
    }}).then(function(result){
      
      res.status(200).json({ success : true, data : result})
    })
  }).catch((err)=>{
    res.status(404).json({ success : true, message : err})
  })
 
 
}) 

//update --
router.put('/myBooking/minus/:id', function(req,res){
  const id = req.params.id;

  Mybooking.findOne({_id : id}).then(function(result) {
    let qty = result.Qty; 
    if(qty > 1)
    {
      Mybooking.findByIdAndUpdate({_id: id}, {$set:{
        Qty : qty-1
      }}).then(function(result){
        
        res.status(200).json({ success : true, data : result})
      })
    }

    else
    {
      res.status(202).json({"success":false,"message":"You need to have atleast one item on cart"})
    }
    
  }).catch((err)=>{
    res.status(404).json({ success : true, message : err})
  })
})
 
 
// }) 

// //Update
// // id - updated data from user
// router.put('/Mytours/update/:id',verifyUser, function(req,res){
// const id = req.params.id;
// const Qty = req.body.Qty;
// console.log(Qty)
// MyVehicle.updateOne({_id : id}, {
//     Qty : Qty
// })
// .then (function(result){
//   console.log("success")
//     res.status(200).json({success : true, message : "Updated!!", data : result})
// })
// .catch(function(e){
//     console.log("err")
//     res.status(500).json({error : e})
// })
// })

router.post('/vehicle/book',verifyUser, function(req,res){
  console.log("we are here")  
 // console.log(req.body.Destination)


  const Booking = new Mybooking({
          UserId:req.User._id,
          Vehicle:req.body._id,
          Qty:req.body.Qty
      })
  Booking.save().then(function(result){
          res.status(200).json({
              success:true, data:"Booked One Car"
          })
      }).catch((err)=>{
        console.log(err)
        return res.status(404).json({"success":false,"message":err})
      })
  })
  
// display Booking
router.get('/vehicles/showall',verifyUser,function(req,res){
  console.log("Rented")


  Mybooking.find({UserId:req.User._id})
  .populate("Vehicle")
  .then((function(data){
      console.log(data)
      res.status(200).json({ success : true, data:data})
  }))

  })


//delete 
router.delete("/Mybooking/delete/:id",verifyUser,function (req, res) {
    const id = req.params.id;
    Mybooking.deleteOne({ _id: id })
      .then(function (result) {
        res.status(200).json({success: true, message: "User deleted" });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);



module.exports = router