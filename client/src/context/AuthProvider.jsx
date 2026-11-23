import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import AuthContext from "./AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verify session on initial load or on demand
    const checkAuth = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/me`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success && data.user) {
                    setUser(data.user);
                    return data.user;
                }
            }

            setUser(null);
            return null;

        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);



    useEffect(() => {
        let isMounted = true;
        const initialize = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && data.success && data.user) {
                        setUser(data.user);
                        return;
                    }
                }
                if (isMounted) setUser(null);

            } catch (err) {
                console.error("Session verification error:", err);
                if (isMounted) setUser(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initialize();

        return () => {
            isMounted = false;
        };
    }, []);

    // Handle Login
    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Login failed");
            }

            setUser(data.user);
            toast.success(data.message || "Logged in successfully!");
            return data;
        } catch (error) {
            toast.error(error.message || "Login failed");
            throw error;
        }
    };

    // Handle Register
    const register = async (userData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success(data.message || "Registration successful! Please login.");
            return data;
        } catch (error) {
            toast.error(error.message || "Registration failed");
            throw error;
        }
    };

    // Handle Logout
    const logout = async () => {
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout request error:", error);
        } finally {
            setUser(null);
            toast.success("Logged out successfully");
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
