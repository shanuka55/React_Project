let Item = require('../models/Item')

const express = require("express");
const ItemController = require('../controller/ItemContoller');

class ItemRoutes{
    #itemController = new ItemController();
    #router=express.Router();

    constructor(){
        this.#configRoutes();
    };

    #configRoutes = () => {
        this.#router.get("/", this.#itemController.getAllItems);
        this.#router.post("/saveItem", this.#itemController.saveItem);
        this.#router.put("/updateItem/:itemCode", this.#itemController.updateItem);
        this.#router.delete("/deleteItem/:itemCode", this.#itemController.deleteItem);
        this.#router.get("/getItemByCode/:itemCode", this.#itemController.getItemByCode);
    };

    getRouter = () => {
        return this.#router;
    };
}

module.exports = ItemRoutes;