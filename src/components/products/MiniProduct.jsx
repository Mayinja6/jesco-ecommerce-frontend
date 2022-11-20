import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/Cart";
import { removeFromWishlist } from "../../redux/slices/Wishlist";

const MiniCartProduct = ({ comp, product }) => {
  const dispatch = useDispatch();

  const { qty, id, img, title, price } = product;

  const removeItem = (component, itemId) => {
    if (component === "CartDrawer") {
      dispatch(removeFromCart(itemId));
    } else if (component === "WishlistDrawer") {
      dispatch(removeFromWishlist(itemId));
    }
  };
  return (
    <div
      className="flex flex-wrap py-[30px]"
      style={{ borderBottom: "1px solid #ebebeb" }}
    >
      <div
        className="w-[90px] h-[90px] relative flex items-center justify-center p-1 sm:p-3"
        style={{ flex: "1 0 75px" }}
      >
        <Link to={`/products/${id}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
            alt="Cart product"
            className="shadow-sm max-h-full max-w-full"
          />
        </Link>
      </div>
      <div className="content relative pl-[15px] grow shrink-0">
        <Link
          to={`/products/${product.id}`}
          className="transition-all text-black font-normal overflow-hidden hover:text-[#fb5d5d]"
        >
          {title}
        </Link>
        <span className="text-[14px] block mt-[10px] font-semibold">
          {qty || 1} x{" "}
          <span className="text-[#fb5d5d]  text-[18px]">
            ${price < 10 ? `0${price}` : price}
          </span>
        </span>
        <span
          className="absolute z-10 bg-white cursor-pointer top-0 right-0 py-0 px-[3px] text-[18px] text-black text-base hover:text-[#eb2606]"
          onClick={() => removeItem(comp, id)}
        >
          ×
        </span>
      </div>
      <style>{`
      .content {
        flex-basis: calc(100% - 150px);
      }

      @media only screen and (max-width: 575px) {
        .content {
          flex: 1 0 calc(100% - 75px);
        }
      }
      `}</style>
    </div>
  );
};

export default MiniCartProduct;
