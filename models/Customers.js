const mongoose = require("mongoose"); // database

// customers Schema definition for MongoDb
const customersSchema = new mongoose.Schema ({
    customerEmail:{
        type:String, 
        required:true,
        validate:{ // checks if the email address contains '@' sign once.
            validator:function(email) {
                if(email.includes('@')) {
                    const check = email.slice(email.indexOf('@')+1)
                    if(check.includes('@')) {
                        return false
                    } else return true
                } else return false
            }
        }
    },
    customerPassword:{type:String, required:true},
    customerName:{type:String, required:true},
    customerImage:{ type: String, default: "" },
    customerAddress:{type:String, required:true},
    customerZipcode:{type:String, required:true},
    customerCity:{type:String, required:true},
    customerCountry:{type:String, required:true},
    customerPhoneNo:{type:String, required:true},
    customerCreated:{ type: Date, default: Date.now }
    // customerBirthdate:Date
    // customerURL:String,
    // customerStatus:{ type: String, default: "NewAdded" },
    // customerUpdated:Date,
    // isCustomerActive:{ type: Boolean, default: true }
});

// Customers Model definitions for MongoDb
const customersModel = mongoose.model ("Customers",customersSchema); // the name of the table/model is "Customers" and will be seen as "Customers" in MongoDB!!!


module.exports = customersModel; // exporting model so that it can be called from other modules