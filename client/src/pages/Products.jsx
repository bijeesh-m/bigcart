import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const Products = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products`)
            const data = await res.json()
            if (data.success && data.products) {
                setProducts(data.products)
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoadingProducts(false)
        }
    }

    const handleAddToCart = async (id, price) => {
        // Enforce login requirement before adding to cart
        if (!isAuthenticated) {
            toast.error("Please login to add items to your cart");
            navigate("/login", { state: { from: location } });
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/add-to-cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id, price })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                toast.success(data.message || "Added to cart!");
            } else {
                toast.error(data.message || "Could not add item to cart");
            }
        } catch (error) {
            console.error("Cart error:", error);
            toast.error("Failed to add to cart");
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Our Products
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Explore our latest collection
                    </p>
                </div>

                {loadingProducts ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => {
                            const discount = product.price && product.discountPrice
                                ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                                : 0;

                            return (
                                <div
                                    key={product._id}
                                    className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                                >
                                    <div>
                                        {/* Image */}
                                        <div className="relative h-64 bg-gray-100">
                                            <img
                                                src={product?.images?.[0] || "https://placehold.co/400x300?text=Product"}
                                                alt={product.productName}
                                                className="h-full w-full object-cover"
                                            />

                                            {product.isFeatured && (
                                                <span className="absolute left-3 top-3 rounded bg-black px-3 py-1 text-xs text-white">
                                                    Featured
                                                </span>
                                            )}

                                            {discount > 0 && (
                                                <span className="absolute right-3 top-3 rounded bg-red-500 px-3 py-1 text-xs text-white">
                                                    {discount}% OFF
                                                </span>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="p-5">
                                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                                {product.brand} · {product.category}
                                            </p>

                                            <h2 className="mt-1 text-base font-semibold text-gray-900">
                                                {product.productName}
                                            </h2>

                                            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                                {product.description}
                                            </p>

                                            {/* Rating */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-yellow-500">★★★★★</span>
                                                <span className="text-xs text-gray-500">
                                                    {product.ratings || 5} ({product.numReviews || 0})
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-3 flex items-baseline gap-2">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₹{(product.discountPrice || product.price)?.toLocaleString("en-IN")}
                                                </span>

                                                {product.discountPrice && product.discountPrice < product.price && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        ₹{product.price.toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Stock */}
                                            <p className="mt-2 text-xs">
                                                {product.stock > 0 ? (
                                                    <span className="text-green-600 font-medium">In Stock</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">Out of Stock</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="p-5 pt-0">
                                        <button
                                            onClick={() => handleAddToCart(product._id, product.discountPrice || product.price)}
                                            disabled={product.stock === 0}
                                            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-gray-300"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
