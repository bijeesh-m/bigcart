import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, { credentials: "include" });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart || { items: [], totalPrice: 0 });
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (prodId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${prodId}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Item removed from cart");
                fetchCart();
            } else {
                toast.error(data.message || "Failed to remove item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error removing item");
        }
    };

    const handleUpdateQuantity = async (prodId, action) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${prodId}/${action}`, {
                method: "PUT",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                fetchCart();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
        );
    }

    const items = cart?.items || [];
    const totalItems = items.reduce((total, item) => total + (item.quantity || 1), 0);
    const calculatedTotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
    const finalPrice = cart?.totalPrice || calculatedTotal;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Shopping Cart
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {totalItems === 0
                                ? "Your cart is currently empty"
                                : `You have ${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`}
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20 px-4 text-center shadow-sm">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <ShoppingBag size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            Looks like you haven't added anything to your cart yet. Discover our latest items!
                        </p>
                        <Link
                            to="/products"
                            className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Cart Items List */}
                        <div className="space-y-4 lg:col-span-2">
                            {items.map((item) => (
                                <div
                                    key={item._id || item.product?._id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Product Image */}
                                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={
                                                    item.product?.images?.[0] ||
                                                    "https://placehold.co/150x150?text=Product"
                                                }
                                                alt={item.product?.productName || "Product"}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                                {item.product?.brand || "Brand"}
                                            </p>
                                            <h2 className="text-base font-semibold text-gray-900">
                                                {item.product?.productName || "Item"}
                                            </h2>
                                            <p className="mt-1 text-sm font-medium text-gray-600">
                                                ₹{item.price?.toLocaleString("en-IN")} each
                                            </p>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.product?._id)}
                                                className="mt-3 flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quantity & Subtotal */}
                                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                                        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product?._id, "decrement")}
                                                disabled={item.quantity <= 1}
                                                className="p-1.5 text-gray-600 hover:text-black disabled:opacity-30"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-3 text-sm font-semibold text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product?._id, "increment")}
                                                className="p-1.5 text-gray-600 hover:text-black"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <p className="text-base font-bold text-gray-900">
                                            ₹{((item.price || 0) * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Items</span>
                                    <span className="font-medium text-gray-900">{totalItems}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">
                                        ₹{finalPrice.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>

                                <hr className="border-gray-200" />

                                <div className="flex justify-between text-base font-bold text-gray-900">
                                    <span>Total Amount</span>
                                    <span>₹{finalPrice.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            <button className="mt-8 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 shadow-sm">
                                Proceed to Checkout
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-400">
                                🔒 Secure encrypted checkout
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
