const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    orderId : {type:String, require:true},
    date : {type:Date, require:true},
    total : {type:Number},
    discount : {type:Number},
    subTotal : {type:Number}
})

const OrderDetails = mongoose.model("OrderDetails",orderDetailsSchema);

module.exports = OrderDetails;