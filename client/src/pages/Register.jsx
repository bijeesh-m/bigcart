import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { UserPlus } from "lucide-react";

function Register() {

    
    const navigate = useNavigate();
    const { register } = useAuth();

    

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
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
            await register(formData);
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
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
                        Create an Account
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Sign up to get started with shopping
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="123-456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <UserPlus size={16} />
                                <span>Register</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold ml-1.5 hover:text-indigo-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
