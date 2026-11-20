

import React from "react";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Package,
    BarChart3,
    Settings,
    Bell,
    Search,
    Menu,
    ChevronDown,
    DollarSign,
    TrendingUp,
} from "lucide-react";

const AdminDashboard = () => {
    return (
        <main className="flex-1 space-y-6 p-4 sm:p-8">

            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard Overview
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and monitor your application
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total Revenue
                        </p>
                        <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                            <DollarSign size={22} />
                        </div>
                    </div>
                    <div className="mt-5 h-8 w-28 rounded bg-gray-100" />
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                        <TrendingUp size={16} />
                        Revenue overview
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total Users
                        </p>
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <Users size={22} />
                        </div>
                    </div>
                    <div className="mt-5 h-8 w-28 rounded bg-gray-100" />
                    <p className="mt-3 text-sm text-gray-400">
                        User overview
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total Orders
                        </p>
                        <div className="rounded-lg bg-green-50 p-3 text-green-600">
                            <ShoppingCart size={22} />
                        </div>
                    </div>
                    <div className="mt-5 h-8 w-28 rounded bg-gray-100" />
                    <p className="mt-3 text-sm text-gray-400">
                        Orders overview
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total Products
                        </p>
                        <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                            <Package size={22} />
                        </div>
                    </div>
                    <div className="mt-5 h-8 w-28 rounded bg-gray-100" />
                    <p className="mt-3 text-sm text-gray-400">
                        Products overview
                    </p>
                </div>

            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Revenue Analytics
                        </h3>
                        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-600">
                            This Month
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                        <div className="text-center text-gray-400">
                            <BarChart3 size={36} className="mx-auto mb-3" />
                            <p className="text-sm">
                                Analytics chart area
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold text-gray-800">
                        Recent Activity
                    </h3>

                    <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                        <p className="text-sm text-gray-400">
                            Activity section
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Recent Orders
                    </h3>
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Action</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="flex h-40 items-center justify-center text-sm text-gray-400">
                        No orders to display
                    </div>
                </div>
            </div>

        </main>



    );
};

export default AdminDashboard;
