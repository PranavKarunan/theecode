import express from 'express'
import { createProduct } from '../controllers/product.js';

const router = express.Router();

router.post("/createProduct",createProduct)

export default router;