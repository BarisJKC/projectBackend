const _ = require('lodash'); // to shorten syntax
const jwt = require('jsonwebtoken') // add security level to passwords with jsonwebtoken
const Admins = require("../models/Admins"); // to use model
const Customers = require("../models/Customers"); // to use model
const Vendors = require("../models/Vendors"); // to use model
const bcrypt = require('bcrypt'); // encryption module with version @3.0.6

addToken = async (req,res,next) => {
    if(req.body.adminEmail) {
        const email=req.body.adminEmail;
        const password=req.body.adminPassword;
        const allAdmins = await Admins.find();
        const selectedAdmin = allAdmins.find(admin=>email===admin.adminEmail);
        if (!selectedAdmin) return res.status(400).send(`Admin does not exisit.`);
        const isPasswordValid = bcrypt.compareSync(password,selectedAdmin.adminPassword);
        if (!isPasswordValid) return res.status(400).send('Invalid email or password');
        const token = jwt.sign(_.pick(selectedAdmin,['adminEmail','adminName','adminCreated']),process.env.SECRET);
        res.header('Authorization',token).send(`Hello ${selectedAdmin.adminName}, Welcome to your account at MarketPlace`);
        next();
    } else if(req.body.customerEmail) {
        const email=req.body.customerEmail;
        const password=req.body.customerPassword;
        const allCustomers = await Customers.find();
        const selectedCustomer = allCustomers.find(customer=>email===customer.customerEmail);
        if (!selectedCustomer) return res.status(400).send(`Customer does not exisit.`);
        const isPasswordValid = bcrypt.compareSync(password,selectedCustomer.customerPassword);
        if (!isPasswordValid) return res.status(400).send('Invalid email or password');
        selectedCustomer.customerPassword=password;
        const token = jwt.sign(_.pick(selectedCustomer,['customerEmail','customerName','customerCity','customerPassword']),process.env.SECRET);
        res.header('Authorization',token).send(`Hello ${selectedCustomer.customerName}, Welcome to your account at MarketPlace`);
        next();
    } else if(req.body.vendorEmail) {
        const email=req.body.vendorEmail;
        const password=req.body.vendorPassword;
        const allVendors = await Vendors.find();
        const selectedVendor = allVendors.find(vendor=>email===vendor.vendorEmail);
        if (!selectedVendor) return res.status(400).send(`Vendor does not exisit.`);
        const isPasswordValid = bcrypt.compareSync(password,selectedVendor.vendorPassword);
        if (!isPasswordValid) return res.status(400).send('Invalid email or password');
        const token = jwt.sign(_.pick(selectedVendor,['vendorEmail','vendorName','vendorCity']),process.env.SECRET);
        res.header('Authorization',token).send(`Hello ${selectedVendor.vendorName}, Welcome to your account at MarketPlace`);
        next();
    };
}

module.exports = addToken;