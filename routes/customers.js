const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Customers = require("../models/Customers"); // to use model
const addSaltToPassword = require('../middleware/addSaltToPassword'); // to add salt into password by middleware
const addToken = require('../middleware/addToken'); // to add token for the admin login
const checkToken = require('../middleware/checkToken'); // to ckeck token to be correct or not

// router.get("/", async (req,res) => {
//     try {
//         res.status(200).send("Welcome to Customers");
//     } catch(err) {
//         console.log(err);
//     };
// });

router.get("/", checkToken, async (req,res) => { // to list names of all registered customers. must be async
    try {
        const allNames = await Customers.find().select('customerName').select('customerCity');
        res.send(allNames);
    } catch (err) {
        console.log(err);
    };
});

router.post("/register", addSaltToPassword, async (req,res) => {// to register a new customer into database
    try {
        const newCustomer = new Customers(req.body);
        await newCustomer.validate(err => { // validation for data type in mongoose
            if (err) return res.status(404).send("Invalid or misssing data, please try again")});
        await new Customers(req.body).save(); // save to database
        res.send(req.body.customerName);
    } catch (error) {
        console.log(error.message);
    };
});

router.post("/login", addToken, async (req,res) => {
    try {
        console.log(req.body.customerEmail);
    } catch (err) {
        console.log(err);
    };
}); // to login for customers

router.get("/profile", checkToken, async (req,res) => {// to send customer profile when correct token is received for customers
    try {
        const allCustomers = await Customers.find();
        const selectedCustomer = allCustomers.find(customer=>customer.customerEmail===req.body.customerEmail);
        selectedCustomer.customerPassword=req.body.customerPassword;
        res.send(selectedCustomer);
    } catch (err) {
        console.log(err);
    };
}); 


router.put("/update", checkToken, addSaltToPassword, async (req,res) => { // to update the password
    try {
        const allCustomers = await Customers.find();
        const updateCustomer = allCustomers.find(customer => customer.customerEmail===req.body.customerEmail);
        updateCustomer.customerPassword = req.body.customerPassword;
        await Customers.findByIdAndUpdate(updateCustomer._id,updateCustomer,{new:true,useFindAndModify:false});
        res.send(`Hello ${updateCustomer.customerName}, your password is updated`);
    } catch (err) {
        console.log(err);
    };
});

module.exports = router; // to export router