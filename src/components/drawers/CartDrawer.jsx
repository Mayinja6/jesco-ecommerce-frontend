import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EmptyCart } from "../../assets/imgs";

import MiniCartProduct from "../products/MiniProduct";

const CartDrawer = ({ setOpenCartDrawer }) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="drawer-div w-[300px] md:w-[400px]">
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-wrap justify-between w-full p-0 relative">
          <p className="font-bold text-lg">Cart</p>
          <span
            className="drawerBtn-close"
            onClick={() => setOpenCartDrawer(false)}
          ></span>
        </div>
        {cartItems.length > 0 ? (
          <div className="minicart my-2 mx-0 pl-0">
            {cartItems.map((p, i) => {
              return (
                <MiniCartProduct key={i} product={p} comp={"CartDrawer"} />
              );
            })}
          </div>
        ) : (
          <div className="font-bold text-sm sm:text-lg uppercase flex flex-col items-center justify-center h-[85vh]">
            <img src={EmptyCart} className="w-1/2" alt="Empty_cart" />
            <h1>Cart is Empty.</h1>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="minicart-btns">
            <Link onClick={() => setOpenCartDrawer(false)} to="/cart">
              <button className="transition-all bg-black hover:bg-[#db5d5d] py-[12px] text-white text-lg  w-full">
                View Cart
              </button>
            </Link>

            <Link onClick={() => setOpenCartDrawer(false)} to="/checkout">
              <button className="bg-[#db5d5d] py-[12px] text-white text-lg mt-[15px]  w-full">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
