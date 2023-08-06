let Order = require('../models/Order')

const express = require("express");
const OrderController = require('../controller/OrderController');

class OrderRoutes{
    #orderController = new OrderController();
    #router=express.Router();

    constructor(){
        this.#configRoutes();
    };

    #configRoutes = () => {
        this.#router.post("/placeOrder", this.#orderController.placeOrder);
    };

    getRouter = () => {
        return this.#router;
    };
}

module.exports = OrderRoutes;