import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { EmptyCart } from "../../assets/imgs";
import MiniCartProduct from "../products/MiniProduct";

const WishlistDrawer = ({ setOpenWishlistDrawer }) => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  return (
    <div className="drawer-div w-[300px] md:w-[400px]">
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-wrap justify-between w-full p-0">
          <p className="font-bold text-lg">WishList</p>
          <span
            className="drawerBtn-close"
            onClick={() => setOpenWishlistDrawer(false)}
          ></span>
        </div>
        {wishlistItems.length > 0 ? (
          <div className="minicart m-0 pl-0">
            {wishlistItems.map((p, i) => {
              return (
                <MiniCartProduct key={i} product={p} comp={"WishlistDrawer"} />
              );
            })}
          </div>
        ) : (
          <div className="font-bold text-sm sm:text-lg uppercase flex flex-col items-center justify-center h-[85vh]">
            <img src={EmptyCart} className="w-1/2" alt="Empty_wishList" />
            <h1>No Desires yet.</h1>
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="minicart-btns">
            <Link to="/wishlist" onClick={() => setOpenWishlistDrawer(false)}>
              <button className="transition-all bg-black hover:bg-[#db5d5d] py-[12px] text-white text-lg  w-full">
                View Wishlist
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
