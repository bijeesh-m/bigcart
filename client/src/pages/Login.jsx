
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {


    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Login Data:", formData);
            // Connect your login API here
            const res = await fetch("http://localhost:5000/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData), credentials: "include" })
            const data = await res.json()
            if (data.success) {
                navigate('/')
            }
        } catch (error) {
            console.log(error);

        }




    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mb-8">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <a
                        href="/register"
                        className="text-blue-600 font-semibold ml-1 hover:text-blue-700"
                    >
                        Register
                    </a>
                </p>

            </div>
        </div>
    );
}

export default Login;
