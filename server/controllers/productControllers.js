import Product from "../models/productModel.js";



export const addProduct = async (req, res) => {

    

    try {
        const product = req.body;
        const newProduct = await Product.create(product)
        res.status(201).json({ message: "Product created", success: true, newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
}









