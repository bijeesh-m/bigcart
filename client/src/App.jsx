import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import HomeLayout from "./layouts/HomeLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import UserProfile from "./pages/UserProfile"
import Cart from "./pages/Cart"
import { Toaster } from "react-hot-toast"
import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/AdminDashboard"
import UsersManagement from "./pages/UsersManagement"
import ProductManagement from "./pages/ProductManagement"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicOnlyRoute from "./components/PublicOnlyRoute"

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Customer Facing Routes Layout */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />

          {/* Protected Customer Routes - Login Required */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Admin Routes - Login & Role "admin" Required */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="products" element={<ProductManagement />} />
        </Route>

        {/* Public-Only / Guest Routes - Redirect away if already logged in */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
              <h1 className="text-6xl font-bold text-gray-800">404</h1>
              <p className="mt-3 text-lg text-gray-600">The page you are looking for does not exist.</p>
              <a href="/" className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                Go to Homepage
              </a>
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
