import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";
import { useToasts } from "react-toast-notifications";

import { ProductReviews, SingleProduct, Spinner } from "../../components";
import { server_down } from "../../assets/imgs";
import {
  product_reset,
  delete_a_product,
  fetch_product_by_id,
} from "../../redux/slices/Products";
import { addToCart } from "../../redux/slices/Cart";
import { ScrollToTop } from "../../utils/ScrollToTop";
import { addToWishList } from "../../redux/slices/Wishlist";

const ProductDetails = () => {
  const [deleteProduct, setDeleteProduct] = useState(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  let { pathname } = useLocation();
  let { productId } = useParams();
  const {
    products,
    productDetails,
    productsSuccess,
    productsRejected,
    productsLoading,
    productsMessage,
  } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const [activeThumb, setActiveThumb] = useState();

  useEffect(() => {
    dispatch(fetch_product_by_id(productId));
    if (productsRejected) {
      addToast(productsMessage, { appearance: "error", autoDismiss: true });
    }

    dispatch(product_reset());
  }, [dispatch, productId, addToast, productsRejected, productsMessage]);

  return (
    <>
      <ScrollToTop />
      {productsLoading && (
        <>
          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Fetching Product Details, Please Wait...
          </h1>
          <Spinner />
        </>
      )}
      {productsRejected && (
        <div className="w-full relative h-[85vh]  flex flex-col items-center justify-evenly p-10">
          <img
            src={server_down}
            className="max-w-full w-full sm:w-[75%] md:w-[50%] lg:w-[40%] h-auto"
            alt="Server Down"
          />

          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Check your network and try again
          </h1>
        </div>
      )}
      {productDetails && (
        <section>
          {/* Product Details */}
          {ProductDetails !== null && (
            <div className="px-5 pt-5 md:pt-[40px] md:px-[80px] md:flex md:justify-center relative">
              <div className="w-full md:w-[45%]  p-5 md:p-8">
                <div className="flex items-center justify-center">
                  <Swiper
                    modules={[Navigation, Thumbs]}
                    slidesPerView={1}
                    thumbs={{ swiper: activeThumb }}
                  >
                    {productDetails &&
                      productDetails.images.map((img, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="h-[350px] flex items-center justify-center">
                              <img
                                className="max-w-full max-h-full object-cover block m-auto cursor-pointer"
                                src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
                                alt="Product_img"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
                <div className="mt-5">
                  <Swiper
                    onSwiper={setActiveThumb}
                    modules={[Navigation, Thumbs]}
                    slidesPerView={4}
                    loop={true}
                  >
                    {productDetails &&
                      productDetails.images.map((img, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <img
                              className="h-[50px] sm:h-[65px] md:h-[80px] block m-auto cursor-pointer"
                              src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
                              alt="Product_img"
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>

              <div className="w-full md:w-[55%] p-5 md:p-8">
                <h2 className="text-black capitalize text-[20px] sm:text-[28px] md:text-[30px] leading-[1] font-semibold mt-0 mx-0 mb-[18px]">
                  {productDetails.title}.
                </h2>

                <ul className="flex text-[24px] text-[#ee3231] leading-[30px] mb-[20px]">
                  <li>${productDetails.price}</li>
                  {productDetails.oldPrice !== 0 && (
                    <li className="ml-2 sm:ml-5 line-through text-[#9f9e9e]">
                      ${productDetails.oldPrice}
                    </li>
                  )}
                </ul>
                <div className="flex">
                  <Rating
                    readOnly
                    precision={0.1}
                    value={productDetails.rating}
                  />
                  <span className="read-review">
                    <span className="text-[#9f9f9f] ml-[8px] relative p-0 text-base inline-block hover:text-[#fb5d5d]">
                      ( {productDetails.numReviews}{" "}
                      {productDetails.numReviews === 1 ? "Review" : "Reviews"} )
                    </span>
                  </span>
                </div>
                <p className="my-[15px] leading-[24px] text-[#474747]">
                  {productDetails.description}
                </p>
                <div className="inline-flex justify-center md:justify-start items-center  w-full my-[30px] mx-auto">
                  <div className="pro-details-compare-wishlist pro-details-wishlist lg:ml-5">
                    {wishlistItems.find(
                      (item) => item.id === productDetails._id
                    ) ? (
                      <span className="relative p-[15px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] bg-[#fb5d5d] flex flex-col items-center transition-colors hover:bg-black text-white cursor-not-allowed">
                        <i className="fa fa-heart-o"></i>
                      </span>
                    ) : (
                      <span
                        className="relative p-[15px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] hover:bg-[#fb5d5d] flex flex-col items-center transition-colors bg-black text-white cursor-pointer"
                        onClick={() =>
                          dispatch(
                            addToWishList({
                              img: productDetails.images[0],
                              price: productDetails.price,
                              title: productDetails.title,
                              id: productDetails._id,
                              stockCount: productDetails.stockCount,
                            })
                          )
                        }
                      >
                        <i className="fa fa-heart-o"></i>
                      </span>
                    )}
                  </div>
                  <div className="pro-details-cart">
                    {cartItems.find(
                      (item) => item.id === productDetails._id
                    ) ? (
                      <button className="relative py-[14px] p-[35px] text-[14px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] bg-[#fb5d5d] flex flex-col items-center transition-colors hover:bg-black text-white cursor-not-allowed">
                        In Cart
                      </button>
                    ) : (
                      <button
                        className="relative py-[14px] p-[35px] text-[14px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] hover:bg-[#fb5d5d] flex flex-col items-center transition-colors bg-black text-white"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              img: productDetails.images[0],
                              price: productDetails.price,
                              title: productDetails.title,
                              id: productDetails._id,
                              stockCount: productDetails.stockCount,
                            })
                          )
                        }
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5f5f5f] inline-block mr-[5px]">
                    Categories:{" "}
                  </span>
                  <ul className="flex">
                    {productDetails.categories &&
                      productDetails.categories.map((c, i) => {
                        return (
                          <li key={i} className="det_category">
                            <Link
                              className="transition-all text-[#9f9f9f] after:text-[#9f9f9f] hover:text-[#fb5d5d]"
                              to="/products"
                            >
                              {c}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5f5f5f] inline-block mr-[5px]">
                    Share:{" "}
                  </span>
                  <ul className="flex">
                    <li>
                      <a
                        className="transition-all text-[#9f9f9f] hover:text-[#fb5d5d] ml-[15px] sm:ml-[20px]"
                        href="/"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="transition-all text-[#9f9f9f] hover:text-[#fb5d5d] ml-[15px] sm:ml-[20px]"
                        href="/"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="transition-all text-[#9f9f9f] hover:text-[#fb5d5d] ml-[15px] sm:ml-[20px]"
                        href="/"
                      >
                        <i className="fa fa-google"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="transition-all text-[#9f9f9f] hover:text-[#fb5d5d] ml-[15px] sm:ml-[20px]"
                        href="/"
                      >
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="transition-all text-[#9f9f9f] hover:text-[#fb5d5d] ml-[15px] sm:ml-[20px]"
                        href="/"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                {user && productDetails.createdBy === user.id && (
                  <>
                    <div className="pro-details-cart flex">
                      <>
                        <button
                          className="relative py-[14px] p-[35px] text-[14px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] mt-[30px] hover:bg-[#fb5d5d] flex flex-col items-center transition-colors bg-black text-white"
                          onClick={() => {
                            setDeleteProduct(true);
                          }}
                        >
                          Delete Product
                        </button>
                        <Dialog
                          open={deleteProduct}
                          onClose={() => setDeleteProduct(false)}
                          aria-labelledby="dialog-title"
                          aria-describedby="dialog-description"
                        >
                          <DialogTitle id="dialog-title">
                            This Product and its images will be Deleted from the
                            Database, are you sure?
                          </DialogTitle>
                          <DialogContent id="dialog-description">
                            <DialogContentText>
                              You are About To delete Your product from the
                              Database, this Action is irreverable, are you
                              sure?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <button
                              className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-[#fb5d5d]"
                              onClick={() => setDeleteProduct(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black"
                              onClick={() => {
                                setDeleteProduct(false);
                                dispatch(delete_a_product(productDetails._id));
                                setTimeout(
                                  window.location.assign("/products", 2000)
                                );
                              }}
                            >
                              Confirm
                            </button>
                          </DialogActions>
                        </Dialog>
                      </>

                      <Link to={`/products/update/${productId}`}>
                        <button className="relative py-[14px] p-[35px] text-[14px] font-semibold border-none rounded-[5px] shadow-none uppercase ml-[10px] mt-[30px] bg-[#fb5d5d] flex flex-col items-center transition-colors hover:bg-black text-white">
                          Update Product
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {/* Product Description */}
          <div className="px-5 pt-5 md:pt-[80px] md:px-[80px]">
            <div className="m-auto mb-0 relative border-b-0 flex items-center justify-center text-center h-[60px] rounded-[5px] border-0 bg-[#f4f4f4]">
              <Link
                to={`/products/${productId}`}
                style={{
                  background:
                    pathname === `/products/${productId}` ? "#fb5d5d" : "unset",
                }}
              >
                <p className="bg-transparent capitalize leading-[24px] text-[#3d3d3d] px-[15px] py-[18px] sm:px-[20px] font-semibold relative transition-colors text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white hover:bg-[#fb5d5d]">
                  Reviews{" "}
                  {productDetails.reviews.length > 0
                    ? `(${productDetails.reviews.length})`
                    : ""}
                </p>
              </Link>
              <Link
                to={`/products/${productId}/info`}
                style={{
                  background:
                    pathname === `/products/${productId}/info`
                      ? "#fb5d5d"
                      : "unset",
                }}
              >
                <p className="bg-transparent capitalize leading-[24px] text-[#3d3d3d] px-[15px] py-[18px] sm:px-[20px] font-semibold relative transition-colors text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white hover:bg-[#fb5d5d]">
                  Information
                </p>
              </Link>
              <Link
                to={`/products/${productId}/desc`}
                style={{
                  background:
                    pathname === `/products/${productId}/desc`
                      ? "#fb5d5d"
                      : "unset",
                }}
              >
                <p className="bg-transparent capitalize leading-[24px] text-[#3d3d3d] px-[15px] py-[18px] sm:px-[20px] font-semibold relative transition-colors text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white hover:bg-[#fb5d5d]">
                  Description
                </p>
              </Link>
            </div>
            <div className="overflow-hidden font-[16px] bg-white pt-[60px] px-0 pb-0">
              <Routes>
                <Route
                  path="/info"
                  element={
                    <div className="text-start">
                      <ul>
                        <li className="text-[#3d3d3d text-[16px] list-none mt-0 mx-0 mb-[13px]">
                          <span className="inline-block text-[#525252] font-medium mt-0 mb-0 mr-[26px] ml-0 min-w-[85px]">
                            Weight
                          </span>{" "}
                          400 g
                        </li>
                        <li className="text-[#3d3d3d text-[16px] list-none mt-0 mx-0 mb-[13px]">
                          <span className="inline-block text-[#525252] font-medium mt-0 mb-0 mr-[26px] ml-0 min-w-[85px]">
                            Dimensions
                          </span>
                          10 x 10 x 15 cm
                        </li>
                        <li className="text-[#3d3d3d text-[16px] list-none mt-0 mx-0 mb-[13px]">
                          <span className="inline-block text-[#525252] font-medium mt-0 mb-0 mr-[26px] ml-0 min-w-[85px]">
                            Materials
                          </span>{" "}
                          60% cotton, 40% polyester
                        </li>
                        <li className="text-[#3d3d3d text-[16px] list-none mt-0 mx-0 mb-[13px]">
                          <span className="inline-block text-[#525252] font-medium mt-0 mb-0 mr-[26px] ml-0 min-w-[85px]">
                            Other Info
                          </span>{" "}
                          American heirloom jean shorts pug seitan letterpress
                        </li>
                      </ul>
                    </div>
                  }
                />
                <Route
                  path="/desc"
                  element={
                    <div className="text-center">
                      <p className="m-0 text-[16px] leading-[30px] text-[#6c788c] font-light">
                        {productDetails
                          ? productDetails.description
                          : "American heirloom jean shorts pug seitan letterpress"}
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProductReviews
                      reviews={productDetails.reviews}
                      productId={productDetails._id}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
          {/* Related Products */}
          <div className="related-products px-5 pt-5 md:pt-[80px] md:px-[80px]">
            <div className="section-title text-center mb-[30px] leading-[1]">
              <h2 className="title text-[24px] sm:text-[36px] m-0">
                Related Products
              </h2>
            </div>
            <div>
              <Swiper
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
                {productsRejected && (
                  <h1>Please connect to an internet connection</h1>
                )}
                {productsSuccess &&
                  products.slice(0, 9).map((product, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <SingleProduct product={product} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="flex items-center justify-center my-[30px]">
            <Link to={"/products"}>
              <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full">
                <i className="fa fa-arrow-left rotate-[45deg]"> </i> Continue
                shopping
              </button>
            </Link>
          </div>

          <style>{`
.section-title .title {
  font-weight: 800;
  margin-bottom: 11px;
  background: linear-gradient(-96deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.det_category:not(:last-child)::after {
  margin-right: 5px;
  content: ","
}
`}</style>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
