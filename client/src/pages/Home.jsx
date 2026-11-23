import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                🚀 New Season Arrivals
                            </span>
                            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Discover the Next Level of <span className="text-indigo-600">Shopping</span>
                            </h1>
                            <p className="mt-5 text-lg text-gray-600">
                                Explore hundreds of curated, high-quality products at competitive prices. Quick delivery and customer happiness guaranteed.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
                                >
                                    <ShoppingBag size={18} />
                                    Shop Now
                                    <ArrowRight size={16} />
                                </Link>
                                <Link
                                    to="/products"
                                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Browse Catalog
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex justify-center">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-indigo-100/50 p-4 max-w-md w-full">
                                <img
                                    src={heroImg}
                                    alt="Hero Storefront"
                                    className="w-full h-auto object-cover rounded-xl"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="border-y border-gray-100 bg-gray-50/60 py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                                <Truck size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                                <p className="text-xs text-gray-500">On all orders across the nation</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-green-100 p-3 text-green-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Secure Payments</h3>
                                <p className="text-xs text-gray-500">100% protected transactions</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                                <RotateCcw size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                                <p className="text-xs text-gray-500">Hassle-free 30 day return policy</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                                <ShoppingBag size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Authentic Items</h3>
                                <p className="text-xs text-gray-500">Directly from verified manufacturers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
