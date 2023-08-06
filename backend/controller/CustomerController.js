const { log } = require('console');
const Customer = require('../models/Customer');

class CustomerController {

    //get all customers
    getAllCustomers = async(req, res) => {
        try {
            const customerList = await Customer.find();
            console.log("Sent Customer Data list");
            res.send(customerList);
        } catch (error) {
            return error
        }
    }

    //save customers
    saveCustomer = async(req, res) => {
        console.log("Save Customer Req : ", req.body);
        const data = await Customer.create(req.body);
        res.send("Customer Saved Successfully...!");
    }

    //update customer
    updateCustomer = async(req, res) => {
        const cID = req.params.customerID;
        console.log('req customer ID : ', cID);
    
        const updateData = req.body;

        Customer.findOneAndUpdate({ cId: cID }, updateData, { new: true })
            .then((updatedCustomer) => {
                if (!updatedCustomer) {
                    return res.status(404).json({
                        error: "Customer not found"
                    });
                }
    
                return res.status(200).json({
                    success: "Update successfully",
                    customer: updatedCustomer
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: "An error occurred while updating the customer"
                });
            });
    }

    deleteCustomer = async(req, res) => {
        const custId = req.params.customerId;
        console.log("req delete customer id : ", custId);

        Customer.findOneAndDelete({cId: custId})
            .then(() => {
                return res.status(200).json({
                    success: "Delete successfully"
                });
            })
            .catch(err => {
                return res.status(400).json({ error: err });
            });
    }

    getCustomerById = async(req, res) => {
        try {
            const custId = req.params.customerId;
            const customer = await Customer.findOne({cId : custId});
            console.log("Sent Customer Data");
            res.send(customer);
        } catch (error) {
            return error
        }
    }

    

}


module.exports = CustomerController;