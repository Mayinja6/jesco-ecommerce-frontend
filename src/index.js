import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ToastProvider } from "react-toast-notifications";

import { Provider } from "react-redux";
import { reduxStore } from "./redux/store";
import { fetch_all_products } from "./redux/slices/Products";

// Swiper Styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./index.css";
import "./assets/css/font-awesome-4.7.0/font-awesome.min.css";
import { ScrollToTopBtn } from "./utils/ScrollToTop";

reduxStore.dispatch(fetch_all_products());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToastProvider>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
        <ScrollToTopBtn />
      </BrowserRouter>
    </Provider>
  </ToastProvider>
);
