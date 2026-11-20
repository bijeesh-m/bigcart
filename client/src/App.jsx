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


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersManagement/>}/>
          <Route path="/admin/products" element={<ProductManagement/>}/>

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  )
}

export default App
