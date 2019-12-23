const mongoose = require("mongoose"); // database

// Admins Schema definition for MongoDb
const adminsSchema = new mongoose.Schema ({
    adminEmail:{
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
    adminPassword:{type:String, required:true},
    adminName:{type:String, required:true},
    adminImage:{type:String, default: ""},
    adminCreated:{type:Date, default: Date.now}
    // adminAddress:String,
    // adminZipcode:String,
    // adminCity:String,
    // adminCountry:String,
    // adminPhoneNo:String,
    // adminBirthdate:Date,
    // adminURL:String,
    // adminStatus:{ type: String, default: "NewAdded" },
    // adminUpdated:Date,
    // isAdminActive:{ type: Boolean, default: true }
});

// Admins Model definitions for MongoDb
const adminsModel = mongoose.model ("Admins",adminsSchema); // the name of the table/model is "Admins" and will be seen as "Admins" in MongoDB!!!


module.exports = adminsModel; // exporting model so that it can be called from other modules