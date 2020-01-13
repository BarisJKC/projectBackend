if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require('express'); // HTTP server
const mongoose = require('mongoose'); // database
const cors = require('cors'); // to allow crossorigin com
const wakeUpDyno = require("./helpers/helpers"); // my module!

const app=express(); // to shorten syntax

//routes definitions
const adminsRoute = require("./routes/admins");
const customersRoute = require("./routes/customers");
const vendorsRoute = require("./routes/vendors");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const commentsRoute = require("./routes/comments");

mongoose // database connection
.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB...."))
.catch(err => console.log("Error",err.message));

app.use(express.json()); //Accept json format for request body
// app.use(cors()); 
app.use(cors({exposedHeaders:['Authorization']})); // to allow cross-origin com and in order to expose the header section

//routes linking
app.use("/admins",adminsRoute);
app.use("/customers",customersRoute);
app.use("/vendors",vendorsRoute);
app.use("/products",productsRoute);
app.use("/orders",ordersRoute);
app.use("/comments",commentsRoute);

app.get("/", async (req, res) => { res.status(200).send('Welcome to MarketPlace'); }); // to test com with server
app.get("/status", async (req, res) => { res.status(200).send('connection alive'); }); // to test com with server
app.get("*", async (req,res) => {res.status(404).send("No such page")}); // to respond for unknown url requests
app.post("*", async (req,res) => {res.status(404).send("No such page")}); // to respond for unknown url requests
app.put("*", async (req,res) => {res.status(404).send("No such page")}); // to respond for unknown url requests
app.delete("*", async (req,res) => {res.status(404).send("No such page")}); // to respond for unknown url requests

app.listen(process.env.PORT,()=>{console.log(`Server is listening at port ${process.env.PORT}...`)}); // server to listen
// wakeUpDyno();