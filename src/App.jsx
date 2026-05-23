import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

// Pages
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import ProductDetails from "./pages/products/ProductDetails";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

import Chat from "./pages/chat/Chat";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🔥 ALL PAGES INSIDE LAYOUT */}
        <Route path="/" element={<Layout />}>

          <Route index element={<Products />} />

          <Route path="add-product" element={<AddProduct />} />
          <Route path="product/:id" element={<ProductDetails />} />

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user" element={<UserDashboard />} />

          <Route path="chat" element={<Chat />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;