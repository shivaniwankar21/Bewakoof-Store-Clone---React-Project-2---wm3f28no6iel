import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "../Providers/AuthProvider";
import NavBar from "../Pages/NavBar";
import { NavSubCat } from "../Pages/NavSubCat";
import { NotFound } from "../Pages/NotFound";
import { TrackOrder } from "../components/TrackOrder";

// Lazy load components
const SingleProductCard = lazy(() =>
  import("./SingleProductCard").then((module) => ({
    default: module.SingleProductCard,
  }))
);
const Home = lazy(() =>
  import("../Pages/Home").then((module) => ({ default: module.Home }))
);
const Login = lazy(() =>
  import("../Pages/Login").then((module) => ({ default: module.Login }))
);
const ProductList = lazy(() =>
  import("../Pages/ProductList").then((module) => ({
    default: module.ProductList,
  }))
);
const WishList = lazy(() =>
  import("./WishList").then((module) => ({ default: module.WishList }))
);
const AddToCart = lazy(() =>
  import("../Pages/AddToCart").then((module) => ({ default: module.AddToCart }))
);
const Address = lazy(() =>
  import("../Pages/Address").then((module) => ({ default: module.Address }))
);
const Register = lazy(() =>
  import("../Pages/Register").then((module) => ({ default: module.Register }))
);
const PaymentProcess = lazy(() =>
  import("../Pages/PaymentProces").then((module) => ({
    default: module.PaymentProcess,
  }))
);
const ConfirmOrderPayment = lazy(() =>
  import("../Pages/ConfirmOrderPayment").then((module) => ({
    default: module.ConfirmOrderPayment,
  }))
);
const OrderConfirmGreetingPage = lazy(() =>
  import("../Pages/OrderConfirmGreetingPage").then((module) => ({
    default: module.OrderConfirmGreetingPage,
  }))
);
const ProductDetails = lazy(() =>
  import("../Pages/ProductDetails").then((module) => ({
    default: module.ProductDetails,
  }))
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        {/* <NavSubCat /> */}

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />

          <Routes>
            <Route path="/products" element={<SingleProductCard />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/addtocart" element={<AddToCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/address" element={<Address />} />
            <Route path="/register" element={<Register />} />
            <Route path="/paymentprocess" element={<PaymentProcess />} />
            <Route
              path="/paymentprocess/confirmorderpayment"
              element={<ConfirmOrderPayment />}
            />
            <Route
              path="/paymentprocess/confirmorderpayment/orderconfirmgreetingPage"
              element={<OrderConfirmGreetingPage />}
            />
            <Route
              path="/productlist/productdetails/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/wishlist/productdetails/:id"
              element={<ProductDetails />}
            />
            <Route path="/trackorder" element={<TrackOrder />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
