import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { ShoppingCart, LogOut, Shield, LogIn, UserPlus } from 'lucide-react'

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-gray-900">
                        Big<span className="text-indigo-600">Cart</span>
                    </span>
                </Link>

                {/* Primary Nav Links */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
                    >
                        Products
                    </Link>
                    {isAuthenticated && user?.role === 'admin' && (
                        <Link
                            to="/admin"
                            className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                        >
                            <Shield size={14} />
                            Admin Panel
                        </Link>
                    )}
                </nav>

                {/* Right Side Auth / User Controls */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            {/* Cart Icon Link */}
                            <Link
                                to="/cart"
                                className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100"
                                aria-label="Cart"
                            >
                                <ShoppingCart size={22} />
                            </Link>

                            {/* User Profile Link */}
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100"
                                aria-label="Profile"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white text-xs">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="hidden text-sm font-medium text-gray-800 lg:inline">
                                    {user?.name?.split(' ')[0]}
                                </span>
                            </Link>

                            {/* Logout Action */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                title="Sign out"
                            >
                                <LogOut size={15} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600"
                            >
                                <LogIn size={16} />
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm"
                            >
                                <UserPlus size={16} />
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
