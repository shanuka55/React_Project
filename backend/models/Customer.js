const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    cId : {type:String, require:true},
    name : {type:String, require:true},
    address : {type:String},
    contact : {type:String},
    email : {type:String}
})

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;