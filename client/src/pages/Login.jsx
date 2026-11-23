import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LogIn } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = await login(formData.email, formData.password);

            // Determine redirect target: prioritize the original route the user attempted to access
            const originPath = location.state?.from?.pathname;
            if (originPath) {
                navigate(originPath, { replace: true });
            } else if (data.user?.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (error) {
            // Handled and displayed via toast in AuthContext
            console.error("Login attempt failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block text-2xl font-black text-gray-900 mb-2">
                        Big<span className="text-indigo-600">Cart</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign in to continue to your account
                    </p>
                </div>

                {location.state?.from && (
                    <div className="mb-5 rounded-lg bg-indigo-50 border border-indigo-100 p-3 text-xs text-indigo-700">
                        Please sign in to access <span className="font-semibold">{location.state.from.pathname}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <LogIn size={16} />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold ml-1.5 hover:text-indigo-700"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
