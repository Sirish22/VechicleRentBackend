const mongoose = require('mongoose')

const UserRegisteration = mongoose.model('UserRegisteration', {
    FirstName: {
        type:String,
        required: true
    },
    LastName:{
        type:String,
        required: true
    },
    Address:{
        type:String
    },
    Email:{
        type:String,
        required:true,
    },
    Phone:{
        type:Number,
        required:true
    },
    Username:{
        type:String,
        required: true,
        unique: true
    },
    Password:{
        type:String,
        required: true
    },
    userType: {
        type: String,
        enum : ['Admin', 'User']
    }
})

module.exports = UserRegisteration