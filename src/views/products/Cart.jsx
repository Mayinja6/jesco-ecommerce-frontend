import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCartItemQty,
  removeFromCart,
  decrementCartItemQty,
} from "../../redux/slices/Cart";

import { CloseBtn, EmptyCart } from "../../assets/imgs";
import { ScrollToTopParams } from "../../utils/ScrollToTop";

function DesiredItem({ qty, img, price, title, id, stockCount }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center rounded-[10px] p-[10px] sm:pb-[30px] max-w-full cartListItem">
      <div className="h-[90px] w-[90px] mr-[15px] sm:mr-[25px] flex items-center justify-center rounded-[10px] overflow-hidden relative">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
          alt="CartImg"
          className="max-w-full max-h-full"
        />
      </div>
      <div className="cartItemContent relative">
        <span
          onClick={() => dispatch(removeFromCart(id))}
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
            <span className="block font-black">
              ${(price * qty).toFixed(2)}
            </span>
          </div>
          <div className="right">
            <div className="product-quantity">
              <div className="num-block skin-2">
                {stockCount > 0 ? (
                  <div className="num-in cartNumberInput">
                    <span
                      className="minus dis"
                      onClick={() => dispatch(decrementCartItemQty(id))}
                    ></span>
                    <label htmlFor="quan-1" className="visually-hidden"></label>
                    <input
                      type="text"
                      className="in-num"
                      value={qty}
                      readOnly
                    />
                    {qty !== stockCount ? (
                      <span
                        className="plus"
                        onClick={() => dispatch(incrementCartItemQty(id))}
                      ></span>
                    ) : (
                      <span className="plus"></span>
                    )}
                  </div>
                ) : (
                  <span className="plus">Out Of Stock</span>
                )}
              </div>
            </div>
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

const Cart = () => {
  const [transportFee] = useState(2.74);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <>
      <ScrollToTopParams />
      <div className="px-5 py-10 md:px-10 lg:px-16">
        <h3 className="text-[24px] leading-[16px]  mt-0 mx-0 mb-5 font-bold text-center">
          Your cart items
        </h3>
        <div className="my-5 flex justify-center  lg:justify-between items-center">
          <Link to={"/products"}>
            <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full hidden lg:inline-block">
              <i className="fa fa-arrow-left"> </i> Continue Shopping
            </button>
          </Link>
          <span className="text-black transition-colors delay-100 my-0 mx-2 hover:text-[#fb5d5d] hidden lg:inline-block">
            <Link to={"/wishlist"}>Wishlist ({wishlistItems.length})</Link>
          </span>
        </div>
        {cartItems.length <= 0 && (
          <div className="text-center px-5">
            <img
              src={EmptyCart}
              className="mx-auto w-[160px] max-w-full"
              alt="Empty Cart"
            />
            <h3 className="text-xl mt-[20px] mx-0 mb-[20px] font-semibold">
              Your Cart is Empty
            </h3>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="bottom flex justify-between flex-col lg:flex-row">
            <ul className="flex-1 lg:flex-auto w-full lg:w-[70%] lg:pr-5">
              {cartItems.map((item, index) => {
                return (
                  <DesiredItem
                    id={item.id}
                    key={index}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    qty={item.qty}
                    stockCount={item.stockCount}
                  />
                );
              })}
            </ul>
            <div className="lg:sticky lg:top-[125px] bg-[#ebebeb] h-[50vh] rounded-[5px] p-[20px] mt-10 lg:mt-0 flex-1 lg:flex-auto sm:w-3/4 sm:mx-auto  w-full lg:w-[30%]">
              <h1 className="text-center uppercase font-medium ">
                Order Sammary
              </h1>
              <div className="my-[20px] mx-0 flex justify-between">
                <span className="text-black font-medium">SubTotal</span>
                <span className="summaryitemprice text-[18px] font-bold">
                  $
                  {cartItems
                    .filter((item) => item.stockCount > 0)
                    .reduce((sum, item) => sum + item.price * item.qty, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="my-[20px] mx-0 flex justify-between font-medium">
                <span className="">Transport</span>
                <span className="summaryitemprice">${transportFee}</span>
              </div>
              {/* <div className="my-[20px] mx-0 flex justify-between font-medium">
              <span className="">Discount</span>
              <span className="summaryitemprice">$-5.90</span>
            </div> */}
              <div className="my-[20px] mx-0 flex justify-between font-bold text-[22px] text-[#fb5d5d]">
                <span className="">Total</span>
                <span className="summaryitemprice">
                  $
                  {(
                    cartItems
                      .filter((item) => item.stockCount > 0)
                      .reduce((sum, item) => sum + item.price * item.qty, 0) +
                    transportFee
                  ).toFixed(2)}
                </span>
              </div>
              <button className="uppercase cursor-pointer px-4 py-3 transition-all  font-semibold bg-[#fb5d5d] text-white hover:bg-black hover:text-white ml-2 w-full rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <Link to={"/products"}>
            <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full lg:hidden inline-block mx-auto mt-5">
              <i className="fa fa-arrow-left"> </i> Continue Shopping
            </button>
          </Link>
        </div>
        <style>{`
        .cartItemContent {
          width: calc(100% - 75px);
        }
        .cartNumberInput {
          border: 1px solid rgba(0, 0, 0, 0.15);
          background: #ffffff;
          border-radius: 4px;
          height: 34px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          width: 98px;
        }
        .cartNumberInput span{
          width: 33.33%;
          display: block;
          height: 100%;
          position: relative;
          cursor: pointer;
        }
        .cartNumberInput span:before,
        .cartNumberInput span:after {
          content: "";
          position: absolute;
          background-color: #000;
          height: 2px;
          width: 10px;
          top: 50%;
          left: 50%;
          margin-top: -1px;
          margin-left: -5px;
        }
        .cartNumberInput span:hover:before,
        .cartNumberInput span:hover:after {
          background-color: #fb5d5d;
        }
        .cartNumberInput span.plus:after {
          transform: rotate(90deg);
        }
        .cartNumberInput input {
          width: 33.33%;
          height: auto;
          border: none;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          color: #000;
        }
      `}</style>
      </div>
    </>
  );
};

export default Cart;
