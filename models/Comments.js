const mongoose = require("mongoose"); // database

// comments Schema definition for MongoDb
const commentsSchema = new mongoose.Schema ({
    commentCustomer:{type:mongoose.Schema.Types.ObjectId,ref:"Customers", required:true},
    commentVendor:[{type:mongoose.Schema.Types.ObjectId,ref:"Vendors"}],
    commentProduct:[{type:mongoose.Schema.Types.ObjectId,ref:"Products"}],
    commentOrder:[{type:mongoose.Schema.Types.ObjectId,ref:"Orders"}],
    commentType:{type:String,default:""},
    commentSubject:{type:String,default:""},
    commentCustomerText:{type:String,default:""},
    commentVendorText:{type:String,default:""},
    commentCreated:{ type: Date, default: Date.now }
    // commentStatus:{ type: String, default: "NewAdded" },
    // commentUpdated:Date,
    // commentActive:{ type: Boolean, default: true }
});

// Comments Model definitions for MongoDb
const commentsModel = mongoose.model ("Comments",commentsSchema); // the name of the table/model is "Comments" and will be seen as "Comments" in MongoDB!!!


module.exports = commentsModel; // exporting model so that it can be called from other modules