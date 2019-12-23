const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Comments = require("../models/Comments"); // to use model

router.get("/", async (req,res) => { // to list names of all registered comments. must be async
    const allComments = await Comments.find().populate("commentCustomer").populate("commentVendor").populate("commentProduct");
    res.send(allComments);
});

router.post("/create", async (req,res) => { // to register a new comment into database
    await new Comments(req.body).save();
    res.send(req.body);    
});

module.exports = router; // to export router