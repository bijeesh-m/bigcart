import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Mail, Phone, Hash, UserCheck } from "lucide-react";

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
        );
    }

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-2xl">
                {/* Page Heading */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Profile
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            View and manage your personal account details
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200">
                    {/* Profile Banner */}
                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-10 text-center">
                        {/* Avatar */}
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold uppercase text-indigo-600 shadow-md">
                            {initial}
                        </div>

                        <h2 className="mt-4 text-2xl font-bold capitalize text-white">
                            {user.name || "Customer"}
                        </h2>

                        <p className="mt-1 text-sm text-indigo-200">
                            {user.email}
                        </p>

                        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold capitalize text-indigo-300 border border-indigo-400/30">
                            <Shield size={13} />
                            <span>{user.role || "user"}</span>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="p-6 sm:p-8">
                        <h3 className="mb-6 text-base font-semibold text-gray-900">
                            Personal Information
                        </h3>

                        <div className="space-y-4">
                            {/* User ID */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-lg bg-gray-100 p-2 text-gray-500">
                                    <Hash size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Account ID
                                    </p>
                                    <p className="mt-0.5 break-all font-mono text-sm text-gray-800">
                                        {user._id}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Name */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-lg bg-gray-100 p-2 text-gray-500">
                                    <UserCheck size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Full Name
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium capitalize text-gray-900">
                                        {user.name || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-lg bg-gray-100 p-2 text-gray-500">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Email Address
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Phone */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-lg bg-gray-100 p-2 text-gray-500">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Phone Number
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                                        {user.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
