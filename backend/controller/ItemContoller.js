const Item = require('../models/Item');

class ItemController {


    //get all items
    getAllItems = async(req, res) => {
        try {
            const itemList = await Item.find();
            console.log("Sent Item Data list");
            res.send(itemList);
        } catch (error) {
            return error
        }
    }

    //save items
    saveItem = async(req, res) => {
        console.log("Save item Req : ", req.body);
        const data = await Item.create(req.body);
        res.send("item Saved Successfully...!");
    }


    //update item
    updateItem = async(req, res) => {
        const iCode = req.params.itemCode;
        console.log('req item code : ', iCode);
    
        const updateData = req.body;

        Item.findOneAndUpdate({ itemCode: iCode }, updateData, { new: true })
            .then((updatedItem) => {
                if (!updatedItem) {
                    return res.status(404).json({
                        error: "Item not found"
                    });
                }
    
                return res.status(200).json({
                    success: "Update successfully",
                    Item: updatedItem
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: "An error occurred while updating the item"
                });
            });
    }


    //delete items
    deleteItem = async(req, res) => {
        const iCode = req.params.itemCode;
        console.log("req delete customer id : ", iCode);

        Item.findOneAndDelete({itemCode: iCode})
            .then(() => {
                return res.status(200).json({
                    success: "Delete successfully"
                });
            })
            .catch(err => {
                return res.status(400).json({ error: err });
            });
    }


    getItemByCode = async(req, res) => {
        try {
            const iCode = req.params.itemCode;
            const item = await Item.findOne({itemCode: iCode});
            console.log("Sent item Data");
            res.send(item);
        } catch (error) {
            return error
        }
    }

}

module.exports = ItemController;