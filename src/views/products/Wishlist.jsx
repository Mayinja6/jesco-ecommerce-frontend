import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/Cart";
import { removeFromWishlist } from "../../redux/slices/Wishlist";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";
import { SingleProduct } from "../../components";
import { CloseBtn, EmptyCart } from "../../assets/imgs";
import { ScrollToTopParams } from "../../utils/ScrollToTop";

function DesiredItem({ img, price, title, id, stockCount }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <li className="flex items-center rounded-[10px] p-[10px] sm:pb-[30px] max-w-full cartListItem">
      <div className="h-[90px] w-[90px] mr-[15px] sm:mr-[25px] flex items-center justify-center rounded-[10px] overflow-hidden relative">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
          alt="WishlistImg"
          className="max-w-full max-h-full"
        />
      </div>
      <div className="cartItemContent relative">
        <span
          onClick={() => dispatch(removeFromWishlist(id))}
          className="p-0 m-0 border-0 cursor-pointer bg-transparent absolute top-1 right-0 leading-[1] text-[#171717]"
        >
          <img
            src={CloseBtn}
            alt="CloseBtn"
            className="h-auto w-[15px] fill-current"
          />
        </span>
        <h5 className="text-[16px] mb-[4px]">
          <Link to={`/products/${id}`} className="hover:text-[#fb5d5d]">
            {title}
          </Link>
        </h5>
        <div className="flex justify-between items-end">
          <div className="left">
            <span className="block font-black">${price.toFixed(2)}</span>
          </div>
          <div className="right">
            {cartItems.find((item) => item.id === id) ? (
              <button
                className="uppercase text-[14px] px-4 py-1 bg-[#ebebeb] font-semibold max-w-full mx-auto mt-5 cursor-not-allowed"
                disabled={true}
              >
                In Cart
              </button>
            ) : (
              <button
                className="uppercase text-[14px] px-2 py-1  transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full mx-auto mt-5"
                onClick={() =>
                  dispatch(addToCart({ img, price, title, id, stockCount }))
                }
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .cartListItem {
          border-right: 2px solid #EBEBEB;
        }
        .cartListItem:not(:last-child) {
          margin-bottom: 30px;
          border-bottom: 2px solid #EBEBEB;
        }
      `}</style>
    </li>
  );
}

const Wishlist = () => {
  const { products, productsSuccess } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <>
      <ScrollToTopParams />
      <div className="px-5 py-10 md:px-10 lg:px-16">
        <h3 className="text-[24px] leading-[16px]  mt-0 mx-0 mb-[30px] font-bold text-center">
          Your Desired items.
        </h3>
        <div className="my-5 flex justify-center  lg:justify-between items-center">
          <Link to="/products">
            <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full hidden lg:inline-block">
              <i className="fa fa-arrow-left"> </i> Continue Shopping
            </button>
          </Link>
          <span className="text-black transition-colors delay-100 my-0 mx-2 hover:text-[#fb5d5d] hidden lg:inline-block">
            <Link to={"/cart"}>Cart ({cartItems.length})</Link>
          </span>
        </div>
        {wishlistItems.length <= 0 && (
          <div className="text-center px-5">
            <img
              src={EmptyCart}
              className="mx-auto w-[160px] max-w-full"
              alt="Empty Cart"
            />
            <h3 className="text-xl mt-[20px] mx-0 mb-[20px] font-semibold">
              There's nothing you wish to check out yet
            </h3>
          </div>
        )}
        {wishlistItems.length > 0 && (
          <div className="bottom flex justify-between flex-col lg:flex-row">
            <ul className="flex-1 lg:flex-auto w-full lg:w-[70%] lg:pr-5">
              {wishlistItems.map((item, index) => {
                return (
                  <DesiredItem
                    id={item.id}
                    key={index}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    stockCount={item.stockCount}
                  />
                );
              })}
            </ul>
            <div className="lg:sticky lg:top-[125px]   rounded-[5px] mt-10 lg:mt-0 flex-1 lg:flex-auto hidden lg:block  w-full lg:w-[30%]">
              <h1 className="text-center font-bold text-[18px] pt-1 rounded-b-md border-b border-[#fb5d5d]">
                Popular Produts
              </h1>
              <div className="wishlist-related">
                {productsSuccess && (
                  <Swiper
                    modules={[Navigation, Thumbs, Autoplay]}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    direction="horizontal"
                    speed={850}
                    navigation={true}
                  >
                    {products.slice(0, 5).map((product, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <SingleProduct product={product} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full lg:hidden inline-block mx-auto mt-5">
            <i className="fa fa-arrow-left"> </i> Continue Shopping
          </button>
        </div>
        <style>{`
            .cartItemContent {
              width: calc(100% - 75px);
            }
          `}</style>
      </div>
    </>
  );
};

export default Wishlist;
