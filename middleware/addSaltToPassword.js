const bcrypt = require('bcrypt'); // encryption module with version @3.0.6
const Admins = require("../models/Admins"); // to use model
const Vendors = require("../models/Vendors"); // to use model
const Customers = require("../models/Customers"); // to use model


addSaltToPassword = async (req,res,next) => {
    const salt = bcrypt.genSaltSync(); // generate salt for password
    if (req.body.adminPassword && !req.body.adminNewPassword) { // if not password change request is sent
        const allAdmins = await Admins.find();
        const existingAdmin = allAdmins.find(admin=>admin.adminEmail===req.body.adminEmail); //  check if the admin email is already registered
        if (existingAdmin) return res.status(400).send("Admin already exists") 
        req.body.adminPassword = bcrypt.hashSync(req.body.adminPassword,salt); // hashing admin password with salt
        next();
    } else if(req.body.adminNewPassword) { // if  password change request is sent
        const allAdmins = await Admins.find();
        const existingAdmin = allAdmins.find(admin=>admin.adminEmail===req.body.adminEmail); //  check if the admin email is already registered
        const isPasswordValid = bcrypt.compareSync(req.body.adminPassword,existingAdmin.adminPassword);
        if (!isPasswordValid) return res.status(400).send("Your password does not match!");
        req.body.adminPassword = bcrypt.hashSync(req.body.adminNewPassword,salt); // hashing admin password with salt
        next();
    } else if (req.body.customerPassword && !req.body.customerNewPassword) {// if not password change request is sent
        const allCustomers = await Customers.find();
        const existingCustomer = allCustomers.find(customer=>customer.customerEmail===req.body.customerEmail); //  check if the customer email is already registered
        if (existingCustomer) return res.status(400).send("Customer already exists");
        req.body.customerPassword = bcrypt.hashSync(req.body.customerPassword,salt); // hashing customer password with salt
        next();
    } else if(req.body.customerNewPassword) { // if  password change request is sent
        const allCustomers = await Customers.find();
        const existingCustomer = allCustomers.find(customer=>customer.customerEmail===req.body.customerEmail); //  check if the customer email is already registered
        const isPasswordValid = bcrypt.compareSync(req.body.customerPassword,existingCustomer.customerPassword);
        if (!isPasswordValid) return res.status(400).send("Your password does not match!");
        req.body.customerPassword = bcrypt.hashSync(req.body.customerNewPassword,salt); // hashing customer password with salt
        next();
    } else if (req.body.vendorPassword && !req.body.vendorNewPassword) {// if not password change request is sent
        const allVendors = await Vendors.find();
        const existingVendor = allVendors.find(vendor=>vendor.vendorEmail===req.body.vendorEmail); //  check if the admin vendor is already registered
        if (existingVendor) return res.status(400).send("Vendor already exists");
        req.body.vendorPassword = bcrypt.hashSync(req.body.vendorPassword,salt); // hashing vendor password with salt
        next();
    } else if(req.body.vendorNewPassword) { // if  password change request is sent
        const allVendors = await Vendors.find();
        const existingVendor = allVendors.find(vendor=>vendor.vendorEmail===req.body.vendorEmail); //  check if the vendor email is already registered
        const isPasswordValid = bcrypt.compareSync(req.body.vendorPassword,existingVendor.vendorPassword);
        if (!isPasswordValid) return res.status(400).send("Your password does not match!");
        req.body.vendorPassword = bcrypt.hashSync(req.body.vendorNewPassword,salt); // hashing vendor password with salt
        next();
    } 
}
module.exports = addSaltToPassword;