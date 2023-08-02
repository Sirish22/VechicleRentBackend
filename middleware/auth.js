const jwt = require('jsonwebtoken');
const { find } =require('../models/registeration_model');
const User = require('../models/registeration_model');

//guard
module.exports.verifyUser = function(req,res, next){
   
        const token = req.headers.authorization.split(" ")[1];
        const UserData = jwt.verify(token, 'secretkey')
        
        User.findOne({ _id : UserData.accId})
        .then(function(result){
     
            req.User = result;
            next();
        })
        .catch(function(e){
            res.status(500).json({ message : "auth failed"})
        })
   
}

//next guard
module.exports.verifyAdmin = function(req,res,next){
    if(!req.User){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    else if(req.User.userType !== 'Admin'){
        return res.status(401).json({message : "Unauthorized user"})
    }
    next();
}