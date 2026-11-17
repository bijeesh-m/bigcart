import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Cart = () => {

    const [cart, setCart] = useState({})

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5000/cart", { credentials: "include" });
            const data = await res.json()
            console.log(data);
            setCart(data.cart)

        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveFromCart = async (prodId) => {
        try {
            const res = await fetch(`http://localhost:5000/cart/${prodId}`, { method: "DELETE", credentials: "include" });
            const data = await res.json()
            toast.success("Item removed from cart!")
            console.log(data);
            fetchCart()
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateQuantity = async (prodId, action) => {
        try {
            const res = await fetch(`http://localhost:5000/cart/${prodId}/${action}`, { method: "PUT", credentials: "include" });
            const data = await res.json();
            console.log(data);
            fetchCart()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">

                <div className="mx-auto max-w-7xl">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Shopping Cart
                        </h1>
                        <p className="mt-2 text-gray-500">
                            You have {cart?.items?.length} products in your cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-2">

                            {cart?.items?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                                >

                                    {/* Product Image */}
                                    <div className="h-28 w-full shrink-0 rounded-lg bg-gray-100 sm:w-28">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.productName}
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">

                                        <p className="text-sm text-gray-500">
                                            {item.product.brand}
                                        </p>

                                        <h2 className="mt-1 text-lg font-semibold text-gray-900">
                                            {item.product.productName}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Price: ₹{item.price.toLocaleString("en-IN")}
                                        </p>

                                        <button onClick={() => handleRemoveFromCart(item.product._id)} className="mt-3 text-sm font-medium text-red-500 hover:text-red-700">
                                            Remove
                                        </button>

                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">

                                        <div className="rounded-lg border border-gray-200 px-4 py-2">

                                            <span className="text-sm text-gray-500">
                                                Qty: <span onClick={() => handleUpdateQuantity(item.product._id, "decrement")} className='bg-gray-400 px-1  text-white ' >-</span>{item.quantity}<span onClick={() => handleUpdateQuantity(item.product._id, "increment")} className='bg-gray-400 px-1  text-white'>+</span>
                                            </span>

                                        </div>

                                        <p className="text-lg font-bold text-gray-900">
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-gray-600">
                                    <span>Total Items</span>
                                    <span>{cart?.items?.reduce((total, item) => total + item.quantity, 0)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{cart?.items?.reduce(
                                            (total, item) => total + item.price * item.quantity,
                                            0
                                        ).toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>

                                <hr className="border-gray-200" />

                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>
                                        ₹{cart.totalPrice?.toLocaleString("en-IN") ||
                                            cart?.items?.reduce(
                                                (total, item) => total + item.price * item.quantity,
                                                0
                                            ).toLocaleString("en-IN")}
                                    </span>
                                </div>

                            </div>

                            <button className="mt-8 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800">
                                Proceed to Checkout
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-400">
                                Secure checkout
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart