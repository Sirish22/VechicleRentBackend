const mongoose = require('mongoose');
const date = new Date()

const Booking = mongoose.model('Mybooking',{
   
    UserId : {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },

    Qty:{
        type: Number,
        default:1
    },

    Vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Vehicle'
    },
    Date: {
        type:String,
        default:date.getDate()
    }

  
})


module.exports = Booking;