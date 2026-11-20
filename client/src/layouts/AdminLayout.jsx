
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

import { Link, Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div>

            <div className="flex min-h-screen bg-gray-50">

                {/* Sidebar */}
                <aside className="hidden w-64 flex-col bg-slate-900 text-white lg:flex">
                    <div className="border-b border-slate-700 p-6">
                        <h1 className="text-2xl font-bold">
                            Admin<span className="text-indigo-400">Panel</span>
                        </h1>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        <p className="px-4 py-3 text-xs uppercase tracking-wider text-gray-500">
                            Main Menu
                        </p>

                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </a>

                        <Link
                            to={"/admin/users"}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-slate-800 hover:text-white"
                        >
                            <Users size={20} />
                            Users
                        </Link>

                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-slate-800 hover:text-white"
                        >
                            <ShoppingCart size={20} />
                            Orders
                        </a>

                        <Link
                            to={"/admin/products"}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-slate-800 hover:text-white"
                        >
                            <Package size={20} />
                            Products
                        </Link>

                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-slate-800 hover:text-white"
                        >
                            <BarChart3 size={20} />
                            Analytics
                        </a>

                        <div className="my-5 border-t border-slate-700" />

                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-slate-800 hover:text-white"
                        >
                            <Settings size={20} />
                            Settings
                        </a>
                    </nav>

                    <div className="border-t border-slate-700 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Admin</p>
                                <p className="text-xs text-gray-400">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Section */}
                <div className="flex min-w-0 flex-1 flex-col">

                    {/* Header */}
                    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8">
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden" aria-label="Open menu">
                                <Menu size={24} />
                            </button>

                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Dashboard
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Overview of your workspace
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="relative hidden md:block">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />
                            </div>

                            <button className="relative" aria-label="Notifications">
                                <Bell size={22} className="text-gray-600" />
                            </button>

                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                                    A
                                </div>
                                <ChevronDown
                                    size={16}
                                    className="hidden text-gray-500 sm:block"
                                />
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default AdminLayout