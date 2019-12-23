const mongoose = require("mongoose"); // database

// orders Schema definition for MongoDb
const ordersSchema = new mongoose.Schema ({
    orderCustomer:{type:mongoose.Schema.Types.ObjectId,ref:"Customers",required:true},
    orderList:[{
        orderVendor:{type:mongoose.Schema.Types.ObjectId,ref:"Vendors",required:true},
        orderProduct:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        orderQty:{type:Number,required:true},
        orderItemValue:{type:Number,required:true},
        orderProductQuality:Number}],
    orderValue:{type:Number,required:true},
    orderStatus:{type:String, default: "Open"},
    orderCustomerText:{type:String, default: ""},
    isOrderShipped:{type:Boolean, default:false},
    deliveryPerformance:Number,
    orderCreated:{ type: Date, default: Date.now }
    // orderStatus:{ type: String, default: "NewAdded" },
    // orderUpdated:Date,
    // orderActive:{ type: Boolean, default: true }
});

// Orders Model definitions for MongoDb
const ordersModel = mongoose.model ("Orders",ordersSchema); // the name of the table/model is "Orders" and will be seen as "Orders" in MongoDB!!!


module.exports = ordersModel; // exporting model so that it can be called from other modules