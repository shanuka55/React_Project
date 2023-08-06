const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId : {type:String, require:true},
    date : {type:Date, require:true},
    total : {type:Number},
    discount : {type:Number},
    subTotal : {type:Number}
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;