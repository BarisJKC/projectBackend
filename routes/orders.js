const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Orders = require("../models/Orders"); // to use model
const checkToken = require('../middleware/checkToken'); // to ckeck token to be correct or not
// const Nexmo = require('nexmo');

// nexmo api keys

// const message = {
//     content: {
//         type: 'text',
//         text: 'Hello from Nexmo',
//     },
// };

// const from = '905326443249'
// const to = '905325218196'
// const text = 'A text message sent using the Nexmo SMS API'


router.get("/", checkToken, async (req,res) => { // to list names of all registered orders. must be async
    const allOrders = await Orders.find().populate("orderCustomer").populate("orderList.orderVendor").populate("orderList.orderProduct").sort({ "orderStatus" : "descending","orderCreated":"descending"});
    const selectedOrders = await allOrders.filter(order => order.orderCustomer.customerEmail===req.body.customerEmail);
    // nexmo.channel.send(
    //     { type: 'sms', number: '905326443249' },
    //     { type: 'sms', number: 'Nexmo' },
    //     message,
    //     (err, data) => { console.log(data.message_uuid); },
    //     { useBasicAuth: true },
    //   );

    // nexmo.message.sendSms(from, to, text, (err, responseData) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if(responseData.messages[0]['status'] === "0") {
    //             console.log("Message sent successfully.");
    //         } else {
    //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
    //         }
    //     }
    // })
    res.send(selectedOrders);
});

router.post("/create", async (req,res) => { // to register a new order into database
    await new Orders(req.body).save();
    console.log("Kayıt başarılı")
    res.send(req.body);
});

module.exports = router; // to export router