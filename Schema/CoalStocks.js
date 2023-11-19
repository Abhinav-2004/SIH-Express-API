const mongoose = require('mongoose');


const StockSchema = new mongoose.Schema({
    stationID:{type:Number},
    stocks:{type:Number},
   
});

const  StockModel = mongoose.model(' Stock', StockSchema);
module.exports =  StockModel;