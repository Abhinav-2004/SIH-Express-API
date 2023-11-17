const mongoose = require('mongoose');


const SiddingUserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    stationID:{type:String},
});

const SiddingUserModel = mongoose.model('SiddingUser', SiddingUserSchema);
module.exports = SiddingUserModel;