const mongoose = require("mongoose"); // database

// products Schema definition for MongoDb
const productsSchema = new mongoose.Schema ({
    productName:{type:String, required:true},
    productType:{type:String, required:true},
    productUnit:{type:String, required:true},
    productOrigin:{type:String, required:true},
    productImage:{ type: String, default: "" },
    productCreated:{ type: Date, default: Date.now }
    // productStatus:{ type: String, default: "NewAdded" },
    // productUpdated:Date,
    // productActive:{ type: Boolean, default: true }
});

// Products Model definitions for MongoDb
const productsModel = mongoose.model ("Products",productsSchema); // the name of the table/model is "Products" and will be seen as "Products" in MongoDB!!!


module.exports = productsModel; // exporting model so that it can be called from other modules