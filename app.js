const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const cors = require('cors');
const registeration_route = require('./routes/registeration_route');
const Vehicles_route = require('./routes/Vehicles_route');
const Booking = require('./routes/Booking')
const { static} = require ('express');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname+'/images'))
app.use(registeration_route);
app.use(Vehicles_route);
app.use(Booking);



app.listen(90)