const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userDataSchema = new Schema({
    username: {
        type: String,
        required: true
      
    },
    phonenumber: {
        type: String,
        required: true,
        unique:true
    },
    age:{
        type:Number,
        required :true
    },
    city:{
        type:String,
        required :true
    }
});


const userModel = db.model('ksd3user', userDataSchema);

module.exports = userModel;
