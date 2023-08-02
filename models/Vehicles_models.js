const mongoose = require ('mongoose');

const Vehicles = mongoose.model('Vehicle',{
    vimage: {
        type: String
    },

    vname: {
        type: String
    },

    vdetails: {
        type: String
    },

    vprice: {
        type: String
    }

})

module.exports = Vehicles
