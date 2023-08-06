const { log } = require('console');
let Customer = require('../models/Customer');

const CustomerController = require("../controller/CustomerController");

//   http://localhost:4000/customer/add
// router.route("/saveCustomer").post((req,res)=>{
//     const cId = req.body.cId;
//     const name = req.body.name;
//     const address = req.body.address;
//     const contact = req.body.contact;

//     const newCustomer = new Customer({
//         cId,
//         name,
//         address,
//         contact
//     });

//     newCustomer.save().then(()=>{
//         res.json("Customer Saved...!");
//     }).catch((err)=>{
//         console.log(err);
//     })
// });

// router.route("/").get((req, res) => {
//     Customer.find().then((Customer) => {
//         res.json(Customer)
//     }).catch((err) => {
//         console.log(err);
//     })
// }); 

// router.put('/updateCustomer:customerId',(req,res)=>{

//     const obId = req.params.customerId;
//     const newObId = obId.slice(1,obId.length);
  
//       Customer.findByIdAndUpdate(newObId, { 
//         $set: req.body
//       })
//           .then(() => {
//               return res.status(200).json({
//                   success: "updated successfully"
//               });
//           })
//           .catch(err => {
//               return res.status(400).json({ error: err });
//           });
   
      
     
//   });

//   router.delete('/deleteCustomer/:customerId', (req, res) => {
//     const obId = req.params.id;
//     const newObId = obId.slice(1,obId.length);
//     console.log(newObId);
      
//     Customer.findByIdAndRemove(newObId) .then(() => {
//       return res.status(200).json({
//           success: "Delete successfully"
//       });
//   })
//   .catch(err => {
//       return res.status(400).json({ error: err });
//   });
//   })

//   router.route('/getCustomer/:customerId').get(async (req, res) => {
//     let userID = req.params.customerId;
//     await Customer.findOne(userID) 


//   })
    

// ----------------------------------------------------------------------
const express = require("express");

class CustomerRoutes{
    #customerController = new CustomerController();
    #router=express.Router();

    constructor(){
        this.#configRoutes();
    };

    #configRoutes = () => {
        this.#router.get("/", this.#customerController.getAllCustomers);
        this.#router.post("/saveCustomer", this.#customerController.saveCustomer);
        this.#router.put("/updateCustomer/:customerID", this.#customerController.updateCustomer);
        this.#router.delete("/deleteCustomer/:customerId", this.#customerController.deleteCustomer);
        this.#router.get("/getCustomerById/:customerId", this.#customerController.getCustomerById);
    };

    getRouter = () => {
        return this.#router;
    };
}

module.exports = CustomerRoutes;