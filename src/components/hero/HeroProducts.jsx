import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SingleProduct, Spinner } from "../../components";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";

import { server_down } from "../../assets/imgs";

const HeroProducts = () => {
  const { products, productsRejected, productsSuccess, productsLoading } =
    useSelector((state) => state.products);
  const { pathname } = useLocation();

  return (
    <div className="p-5 sm:p-[80px]">
      <div className="heroProducts_head flex items-center justify-between flex-wrap">
        <div className="section-title mb-0">
          <h2 className="title">#products</h2>
        </div>
        <ul className="mb-[15px] md:mb-0 mt-[9px] nav">
          {[
            { link: "/", name: "All" },
            { link: "/new", name: "New" },
            { link: "/discount", name: "discount" },
            { link: "/item", name: "Items Sale" },
          ].map((tab, i) => {
            return (
              <li
                key={i}
                className="mr-[10px] inline-block text-[14px] uppercase p-0 cursor-pointer font-semibold"
              >
                <Link
                  to={tab.link}
                  className={`nav-link ${
                    pathname === tab.link ? "active" : ""
                  } flex flex-col justify-center items-center leading-[1] rounded-[5px] transition-all relative bg-[#f8f8f8] text-[#5f5f5f] py-[9px] px-2 sm:px-[23px]`}
                >
                  {tab.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {productsLoading && (
                <>
                  <h1>Loading Products Please Wait...</h1>
                  <Spinner />
                </>
              )}
              {productsRejected && (
                <div className="w-full relative flex flex-col items-center justify-evenly p-10">
                  <img
                    src={server_down}
                    className="max-w-full max-h-full sm:w-auto sm:h-[250px]"
                    alt="Server Down"
                  />

                  <h1 className="text-[24px] sm:text-[40px] text-center font-black">
                    Check your network and try again
                  </h1>
                </div>
              )}
              {productsSuccess && products.length <= 0 && (
                <h1>No Products in the Database</h1>
              )}
              {products.length > 0 && (
                <Swiper
                  className="heroProduct"
                  modules={[Navigation, Thumbs, Autoplay]}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    746: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                  }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  navigation={true}
                  speed={500}
                >
                  {products.slice(0, 8).map((product, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <SingleProduct product={product} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              {productsLoading && (
                <>
                  <h1>Loading Products Please Wait...</h1>
                  <Spinner />
                </>
              )}
              {productsRejected && (
                <div className="w-full relative flex flex-col items-center justify-evenly p-10">
                  <img
                    src={server_down}
                    className="max-w-full max-h-full sm:w-auto sm:h-[250px]"
                    alt="Server Down"
                  />

                  <h1 className="text-[24px] sm:text-[40px] text-center font-black">
                    Check your network and try again
                  </h1>
                </div>
              )}
              {productsSuccess &&
                products.filter((product) => product.badges[0]?.class === "new")
                  .length <= 0 && <h1>No New Products Sofar</h1>}
              {productsSuccess &&
                products.filter((product) => product.badges[0]?.class === "new")
                  .length > 0 && (
                  <Swiper
                    className="heroProduct"
                    modules={[Navigation, Thumbs, Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 20 },
                      746: { slidesPerView: 3, spaceBetween: 30 },
                      1024: { slidesPerView: 4, spaceBetween: 40 },
                    }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    navigation={true}
                    speed={500}
                  >
                    {products
                      .filter((product) => product.badges[0]?.class === "new")
                      .slice(0, 8)
                      .map((product, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <SingleProduct product={product} />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                )}
            </>
          }
        />
        <Route
          path="/discount"
          element={
            <>
              {productsLoading && (
                <>
                  <h1>Loading Products Please Wait...</h1>
                  <Spinner />
                </>
              )}
              {productsRejected && (
                <div className="w-full relative flex flex-col items-center justify-evenly p-10">
                  <img
                    src={server_down}
                    className="max-w-full max-h-full sm:w-auto sm:h-[250px]"
                    alt="Server Down"
                  />

                  <h1 className="text-[24px] sm:text-[40px] text-center font-black">
                    Check your network and try again
                  </h1>
                </div>
              )}
              {productsSuccess &&
                products.filter(
                  (product) => product.badges[0]?.class === "sale"
                ).length <= 0 && <h1>No Discount Products</h1>}
              {products.filter((product) => product.badges[0]?.class === "sale")
                .length > 0 && (
                <Swiper
                  className="heroProduct"
                  modules={[Navigation, Thumbs, Autoplay]}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    746: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                  }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  navigation={true}
                  speed={500}
                >
                  {products
                    .filter((product) => product.badges[0]?.class === "sale")
                    .slice(0, 8)
                    .map((product, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <SingleProduct product={product} />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </>
          }
        />
        <Route
          path="/item"
          element={
            <>
              {productsLoading && (
                <>
                  <h1>Loading Products Please Wait...</h1>
                  <Spinner />
                </>
              )}
              {productsRejected && (
                <div className="w-full relative flex flex-col items-center justify-evenly p-10">
                  <img
                    src={server_down}
                    className="max-w-full max-h-full sm:w-auto sm:h-[250px]"
                    alt="Server Down"
                  />

                  <h1 className="text-[24px] sm:text-[40px] text-center font-black">
                    Check your network and try again
                  </h1>
                </div>
              )}
              {productsSuccess && products.length <= 0 && (
                <h1>No Products Sofar</h1>
              )}
              {products.length > 0 && (
                <Swiper
                  className="heroProduct"
                  modules={[Navigation, Thumbs, Autoplay]}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    746: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                  }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  navigation={true}
                  speed={500}
                >
                  {products.slice(0, 8).map((product, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <SingleProduct product={product} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </>
          }
        />
      </Routes>
      <div className="flex items-center justify-center mt-[30px]">
        <Link to={"/products"}>
          <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full">
            All Products <i className="fa fa-arrow-right -rotate-[45deg]"> </i>
          </button>
        </Link>
      </div>
      <style>
        {`
          .nav-link:hover,
          .nav-link.active {
          color: #fff;
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
        }
          `}
      </style>
    </div>
  );
};

export default HeroProducts;
