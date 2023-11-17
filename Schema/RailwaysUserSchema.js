const mongoose = require('mongoose');


const RailwaysUserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
});

const  RailwaysUserModel = mongoose.model(' RailwaysUser', RailwaysUserSchema);
module.exports =  RailwaysUserModel;