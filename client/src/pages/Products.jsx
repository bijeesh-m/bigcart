import React, { useEffect, useState } from 'react'

const Products = () => {


    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {

            const res = await fetch("http://localhost:5000/products")
            const data = await res.json()
            console.log(data.products);
            setProducts(data.products)

        } catch (error) {
            console.log(error);
        }
    }

    

    const handleAddToCart = async (id, price) => {
        const res = await fetch("http://localhost:5000/add-to-cart", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ id, price }) })
        const data = await res.json();
        console.log(data);
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

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {products.map((product) => {

                        const discount = Math.round(
                            ((product.price - product.discountPrice) /
                                product.price) * 100
                        );

                        return (
                            <div
                                key={product._id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                            >

                                {/* Image */}
                                <div className="relative h-64 bg-gray-100">

                                    <img
                                        src={product?.images[0]}
                                        alt={product.productName}
                                        className="h-full w-full object-cover"
                                    />

                                    {product.isFeatured && (
                                        <span className="absolute left-3 top-3 rounded bg-black px-3 py-1 text-xs text-white">
                                            Featured
                                        </span>
                                    )}

                                    <span className="absolute right-3 top-3 rounded bg-red-500 px-3 py-1 text-xs text-white">
                                        {discount}% OFF
                                    </span>

                                </div>

                                {/* Details */}
                                <div className="p-5">

                                    <p className="text-sm text-gray-500">
                                        {product.brand} / {product.category}
                                    </p>

                                    <h2 className="mt-2 text-lg font-semibold text-gray-900">
                                        {product.productName}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                        {product.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-yellow-500">
                                            ★★★★★
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {product.ratings} ({product.numReviews})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="text-xl font-bold">
                                            ₹{product.discountPrice.toLocaleString("en-IN")}
                                        </span>

                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{product.price.toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                    {/* Stock */}
                                    <p className="mt-3 text-sm">
                                        {product.stock > 0 ? (
                                            <span className="text-green-600">
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                Out of Stock
                                            </span>
                                        )}
                                    </p>

                                    {/* Button */}
                                    <div className=' flex gap-3'>
                                        <button
                                            disabled={product.stock === 0}
                                            className="mt-4 w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            View Product
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product._id, product.price)}
                                            className="mt-4 w-full rounded-lg bg-orange-400 py-3 font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default Products