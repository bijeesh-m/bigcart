import { Navigate,  useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

/**
 * Senior Developer Standard Protected Route
 *
 * 1. Shows a loading indicator while verifying user authentication state on page load/refresh.
 * 2. Redirects unauthenticated users to /login and preserves their intended target in location state.
 * 3. Enforces Role-Based Access Control (RBAC) via `allowedRoles`.
 * 4. Can be used either as an element wrapper: `<ProtectedRoute><Profile /></ProtectedRoute>`
 *    or as a layout route wrapper around `<Outlet />`.
 */
const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = "/login" }) => {
    const { user, loading, isAuthenticated } = useAuth();
    
    const location = useLocation();

    // 1. While checking token on initial page load / refresh, render an accessible loading spinner
    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                <p className="mt-4 text-sm font-medium text-gray-600">Verifying authentication...</p>
            </div>
        );
    }

    // 2. Unauthenticated: Redirect to login with current path saved in location state
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // 3. Role-Based Access Control (RBAC): Check if user has sufficient privileges
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        toast.error("Access denied: You do not have permission to view this page.", { id: "unauthorized-toast" });
        return <Navigate to="/" replace />;
    }

    // 4. Authenticated & Authorized: Render children or nested routes via Outlet
    return children ;
};

export default ProtectedRoute;
