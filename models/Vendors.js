const mongoose = require("mongoose"); // database

// vendors Schema definition for MongoDb
const vendorsSchema = new mongoose.Schema ({
    vendorEmail:{
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
    vendorPassword:{type:String, required:true},
    vendorName:{type:String, required:true},
    vendorImage:{type: String, default: "" },
    vendorAddress:{type:String, required:true},
    vendorZipcode:{type:String, required:true},
    vendorCity:{type:String, required:true},
    vendorCountry:{type:String, required:true},
    vendorPhoneNo:{type:String, required:true},
    vendorOwnerName:{type:String, required:true},
    vendorOwnerPhone:{type:String, required:true},
    vendorOwnerEmail:{type:String, required:true},
    vendorContactName:{type:String, required:true},
    vendorContactPhone:{type:String, required:true},
    vendorContactEmail:{type:String, required:true},
    vendorURL:{type: String, default: "" },
    vendorCreated:{type: Date, default: Date.now },
    vendorPortfolio:[{
        vendorProduct:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        vendorQty:{type:Number, required:true},
        vendorPrice:{type:String, required:true}}],
    // vendorBirthdate:Date
    // vendorStatus:{ type: String, default: "NewAdded" },
    // vendorUpdated:Date,
    // isVendorActive:{ type: Boolean, default: true }
});

// Vendors Model definitions for MongoDb
const vendorsModel = mongoose.model ("Vendors",vendorsSchema); // the name of the table/model is "Vendors" and will be seen as "Vendors" in MongoDB!!!


module.exports = vendorsModel; // exporting model so that it can be called from other modules