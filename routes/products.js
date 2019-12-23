const express = require("express"); // HTTP server
const router = express.Router(); // use router module of express
const Products = require("../models/Products"); // to use model

router.get("/", async (req,res) => { // to list names of all registered proeducts. must be async
    const allNames = await Products.find();
    res.send(allNames);
});

router.post("/create", async (req,res) => { // to add new product into database
    const allProducts = await Products.find();
    const existingProducts = allProducts.find(product=>
        product.productName===req.body.productName&&
        product.productType===req.body.productType&&
        product.productUnit===req.body.productUnit&&
        product.productOrigin===req.body.productOrigin) //  check if the product is already registered
    if (existingProducts) return res.status(400).send("Product already exists") 
    const newProduct = await new Products(req.body).save(); // save to database
    res.send(newProduct);
});

router.put("/update", async (req,res) => {res.send("Product is Updated");});

router.delete("/delete", async (req,res) => {res.send("Product is Deleted");});

module.exports = router; // to export router