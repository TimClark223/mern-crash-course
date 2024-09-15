import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import mongoose from 'mongoose';
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept json data in req.data

app.get("/api/products", async(req, res) => { // for getting all products
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

app.post("/api/products", async(req, res) => { // for adding products
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product (product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

app.delete("/api/products/:id", async(req, res) => { // for deleting products
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(404).json({success:false, message: "Product not found"});

    }
});

app.post("/api/products", async(req, res) => { // for updating products
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message: "Product not found"});

    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(201).json({success:true, data: updatedProduct});
    } catch (error) {
        console.error("Error in Create Product: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

app.listen(5000, () => {
    console.log("Console started at http://localhost:5000");
});

connectDB();
