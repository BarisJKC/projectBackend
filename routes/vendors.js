const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Vendors = require("../models/Vendors"); // to use model
const addSaltToPassword = require('../middleware/addSaltToPassword'); // to add salt into password by middleware
const addToken = require('../middleware/addToken'); // to add token for the admin login
const checkToken = require('../middleware/checkToken'); // to ckeck token to be correct or not

router.get("/", async (req,res) => {// to list names of all registered vendors. must be async
    const allNames = await Vendors.find().select('vendorName').select('vendorCity').select('vendorPortfolio').populate('vendorPortfolio.vendorProduct');
    res.send(allNames);
});

router.post("/register", addSaltToPassword, async (req,res) => {// to register a new vendor into database
    try {
        const newVendor = new Vendors(req.body);
        await newVendor.validate(err => { // validation for data type in mongoose
            if (err) return res.status(404).send("Invalid or misssing data, please try again")});
        await new Vendors(req.body).save(); // save to database
        res.send(req.body);
    } catch (error) {console.log(error.message)};
});

router.post("/login", addToken, async (req,res) => {}); // to login for vendors

router.put("/update", checkToken, addSaltToPassword, async (req,res) => { // to update the password
    const allVendors = await Vendors.find();
    const updateVendor = allVendors.find(vendor => vendor.vendorEmail===req.body.vendorEmail);
    updateVendor.vendorPassword = req.body.vendorPassword;
    await Vendors.findByIdAndUpdate(updateVendor._id,updateVendor,{new:true,useFindAndModify:false});
    res.send(`Hello ${updateVendor.vendorName}, your password is updated`);
});

module.exports = router; // to export router