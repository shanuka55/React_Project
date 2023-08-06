const Order = require('../models/Order');

class OrderController {


    //place order
    placeOrder = async(req, res) => {
        console.log("Save Order Req : ", req.body);
        const data = await Order.create(req.body);
        res.send("Order Saved Successfully...!");
    }
}

module.exports = OrderController;