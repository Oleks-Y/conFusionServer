const mongoose = require('mongoose')

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const prommotionSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true,
    },
    label :{
        type : String,
    },
    price : {
        type : Currency,
        required: true,
        min: 0
    },
    description:{
        type : String,
        required : true,
    },
    featured : {
        type : Boolean,
        default: false
    }
},
    {
        timestamp: true
    })

var Promotions = mongoose.model("Promotion", prommotionSchema);
module.exports = Promotions;
