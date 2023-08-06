const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemCode : {type:String, require:true},
    description : {type:String, require:true},
    unitPrice : {type:Number, require:true},
    qty : {type:Number, require:true},
    img : {type:String}
})

const Item = mongoose.model("Item",itemSchema);

module.exports = Item;