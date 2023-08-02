const express = require('express');
//const {update} = require('../models/registeration_model');
const router = express.Router();
const UserRegisteration = require('../models/registeration_model');
const {check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const upload = require('../middleware/upload');


router.post('/register',[
    check('firstname', "Firstname is required!").not().isEmpty(),
    check('lastname', "Lastname is required!").not().isEmpty(),
    check('email', "Invalid email!").isEmail(),
    check('email', "Email is required!").not().isEmpty(),
    check('phone', "Phone number is required!").not().isEmpty(),
    check('phone', "Invalid Phone number!").isMobilePhone(),
    check('username', "Username is required!").not().isEmpty(),
    check('password', "Password is required!").not().isEmpty()
],
 function(req,res){
     console.log("asjffsdsfj")
     const errors = validationResult(req);
     if(errors.isEmpty()){
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const age = req.body.age;
        const email = req.body.email;
        const address = req.body.address;
        const phone = req.body.phone;
        const username = req.body.username;
        const password = req.body.password;
        const userType = req.body.userType;

        bcryptjs.hash(password, 10, function(err, hash){
            const data = new UserRegisteration({FirstName:firstname, LastName:lastname,Email:email, Address:address, Phone:phone, Username: username, Password:hash, userType: userType})
            data.save()
            .then(function(result){
                //success message with status code
                res.status(201).json({message: "User account registered!", success: true})
            })
            .catch(function(err){
                res.status(500).json({error: err})
            })
        })
    }
    else{
        //Invalid data from User
        res.status(202).json(errors.array())
    }
           
})

router.post('/login',function(req,res){
 
    const username = req.body.username;
    const password = req.body.password;
    
 
    UserRegisteration.findOne({Username:username})
    .then(function(accData){
        if(accData===null){
               //email or username not found...
                return res.status(401).json({success:false,message : "Invalid !"})    
 
        }
        //now lets compare the password....
        bcryptjs.compare(password,accData.password,function(err,result){
            if(result===false){

                //username correct/ password incorrect
                return res.status(401).json({success:false,message: "Invalid credential!"})
            }
            //now lets generate token
            const token = jwt.sign({accId : accData._id}, 'secretkey');
            console.log(token)
            res.status(200).json({success:true,token:token, message: "Auth success!!",data:accData})
          
        })
    })
    .catch(function(e){
        res.status(500).json({error : e })
    })
})



router.get('/display', function(req,res){
    UserRegisteration.find().then(function(data){
        res.send(data)
    })
})

// for delete 
router.delete('/registerationdelete/:myid', function(req,res){
    const id = req.params.myid;
    UserRegisteration.deleteOne({_id: id}).then(function(){
        res.send('deleted!!')
    })
})

// for Update 
router.put('/registerationupdate/:myid', function(req,res){
    const id = req.params.myid;
    const username= req.body.username;
    const firstname = req.body.firstname;
    UserRegisteration.updateMany({_id: id}, {Username:username, FirstName: firstname}).then(function(){
        res.send('Updated!')
    })
})

router.put('/photo/:id', upload.single('file'), function(req,res){
    const id = req.params.id
    const file = req.file
    console.log(req.file)
    User.updateOne({_id:id},{
        userImage:file.filename
    })
    .then(function(result){
                res.status(200).json({success:true, message:'uploaded', data:result})
            })  
            .catch(function(err){
                res.status(500).json({
                    success:false,
                    error:err
                })
            })
        })


module.exports = router
