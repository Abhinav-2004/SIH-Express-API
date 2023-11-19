const mongoose = require('mongoose');


const SiddingUserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    stationID:{type:Number},
});

const SiddingUserModel = mongoose.model('SiddingUser', SiddingUserSchema);
module.exports = SiddingUserModel;