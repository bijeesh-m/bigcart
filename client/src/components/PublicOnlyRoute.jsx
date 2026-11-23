import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
 * PublicOnlyRoute (Guest Route)
 * Prevents authenticated users from viewing /login or /register.
 * Redirects them back to the referring page or their role's dashboard.
 */
const PublicOnlyRoute = ({ children }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
        );
    }

    if (isAuthenticated) {
        const fromPath = location.state?.from?.pathname;
        const defaultPath = user?.role === "admin" ? "/admin" : "/";
        return <Navigate to={fromPath || defaultPath} replace />;
    }

    return children
};

export default PublicOnlyRoute;
