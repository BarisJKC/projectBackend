const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Admins = require("../models/Admins"); // to use model
const addSaltToPassword = require('../middleware/addSaltToPassword'); // to add salt into password by middleware
const addToken = require('../middleware/addToken'); // to add token for the admin login
const checkToken = require('../middleware/checkToken'); // to ckeck token to be correct or not

router.get("/", checkToken, async (req,res) => { // to list names of all registered admins. must be async
    const allNames = await Admins.find().select('adminName');
    res.send(allNames);
});

router.post("/register", addSaltToPassword, async (req,res) => { // to register a new admin into database  
    try {
        const newAdmin = new Admins(req.body);
        await newAdmin.validate(err => { // validation for data type in mongoose
            if (err) return res.status(404).send("Invalid or misssing data, please try again")});
        await new Admins(req.body).save(); // save to database
        // res.redirect('/admins/login');
        res.send(req.body);
    } catch (error) {console.log(error.message)};
});

router.post("/login", addToken, async (req,res) => {}); // to login for admin

router.put("/update", checkToken,addSaltToPassword, async (req,res) => { // to update the password
    const allAdmins = await Admins.find();
    const updateAdmin = allAdmins.find(admin => admin.adminEmail===req.body.adminEmail);
    updateAdmin.adminPassword = req.body.adminPassword;
    await Admins.findByIdAndUpdate(updateAdmin._id,updateAdmin,{new:true,useFindAndModify:false});
    res.send(`Hello ${updateAdmin.adminName}, your password is updated`);
});

module.exports = router; // to export router