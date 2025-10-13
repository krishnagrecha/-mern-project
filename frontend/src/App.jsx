import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Import Layouts
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Admin/AdminLayout";

// Import Pages
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminHomePage from "./pages/AdminHomePage";

// Import Common Components
import ScrollToTop from "./components/Common/ScrollToTop";
import UserManageMent from "./components/Admin/UserManageMent";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* --- User Facing Pages --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
        </Route>

        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManageMent />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
