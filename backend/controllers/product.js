import Product from "../model/Product.js"

export const createProduct = async (req,res,next)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json("Product Created!")
    } catch (error) {
        next(error)
    }
}