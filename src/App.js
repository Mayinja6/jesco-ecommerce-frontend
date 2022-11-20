import { Route, Routes, Navigate } from "react-router-dom";

import { Header, Footer } from "./components";

import {
  About,
  Account,
  Auth,
  Contact,
  NotFound,
  Hero,
  Wishlist,
  Cart,
  Checkout,
  ProductList,
  ProductDetails,
  AllUsers,
  PrivacyPolicy,
  CreateAProduct,
  UpdateProduct,
} from "./views";

import { useSelector } from "react-redux";
const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Hero />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/account/*"
          element={user ? <Account /> : <Navigate to={"/auth"} />}
        />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        {user && (
          <Route
            path="/products/new"
            element={
              user.isAdmin ? <CreateAProduct /> : <Navigate to={"/products"} />
            }
          />
        )}
        {user && (
          <Route
            path="/admin/users"
            element={user.isAdmin ? <AllUsers /> : <Navigate to={"/"} />}
          />
        )}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId/*" element={<ProductDetails />} />
        <Route
          path="/products/update/:productId/*"
          element={user ? <UpdateProduct /> : <Navigate to={"/auth"} />}
        />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
