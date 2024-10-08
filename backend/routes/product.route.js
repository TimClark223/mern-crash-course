import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.post("/:id", updateProduct);

export default router;