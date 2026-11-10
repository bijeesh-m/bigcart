import Cart from "../models/cartModel.js"




export const addToCart = async (req, res) => {
    try {

        const user = req.params.userId

        const { product, price } = req.body


        const newCart = await Cart.create({ user: user, items: [{ product: product, price: price }], totalPrice: price })


    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
}