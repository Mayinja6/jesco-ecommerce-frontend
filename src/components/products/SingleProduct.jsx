import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/Cart";
import { addToWishList } from "../../redux/slices/Wishlist";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const {
    images,
    price,
    rating,
    title,
    _id,
    badges,
    oldPrice,
    numReviews,
    stockCount,
  } = product;

  return (
    <div className="product my-2 sm:my-5 p-3 sm:p-4 shadow">
      <div className="thumb">
        <Link
          to={`/products/${_id}`}
          className="flex items-center justify-center overflow-hidden w-auto h-[200px] relative"
        >
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${images[0].filename}`}
            alt="Shop Product"
            className="z-[1px] transition-all w-auto max-h-full"
          />
        </Link>
        <span className="badges">
          {badges.length > 0 &&
            badges.map((badge, i) => {
              return (
                <span key={i} className={badge.class}>
                  {badge.name}
                </span>
              );
            })}
        </span>
        <div className="actions">
          {wishlistItems.find((item) => item.id === _id) ? (
            <span
              className={`action wishlist ${
                wishlistItems.find((item) => item.id === _id) ? "active" : ""
              } cursor-pointer`}
            >
              <i
                className={`fa fa-heart-o  ${
                  wishlistItems.find((item) => item.id === _id) && "text-white"
                }`}
              ></i>
            </span>
          ) : (
            <span
              className={`action wishlist cursor-pointer`}
              onClick={() =>
                dispatch(
                  addToWishList({
                    id: _id,
                    title,
                    price,
                    img: images[0],
                    stockCount,
                  })
                )
              }
            >
              <i className={`fa fa-heart-o `}></i>
            </span>
          )}
          {/* <div className="action quickview">
            <i className="fa fa-search"></i>
          </div> */}
        </div>

        {cartItems.find((item) => item.id === _id) ? (
          <></>
        ) : (
          <button
            className="add-to-cart"
            onClick={() =>
              dispatch(
                addToCart({ id: _id, title, price, img: images[0], stockCount })
              )
            }
          >
            Add To Cart
          </button>
        )}
      </div>
      <div className="content">
        <span className="ratings">
          <Rating size="small" readOnly value={rating} />{" "}
          <span className="text-[#9f9f9f] ml-[8px] relative p-0 text-base inline-block hover:text-[#fb5d5d]">
            {numReviews < 1 ? (
              <>( Not Reviewed )</>
            ) : (
              <>
                ( {numReviews} {numReviews === 1 ? "Review" : "Reviews"} )
              </>
            )}
          </span>
        </span>
        <h5 className="title">
          <Link to={`/products/${_id}`}>{title}</Link>
        </h5>
        <span className="price">
          <span className="new">${price}</span>
          {oldPrice !== 0 && <span className="old">${oldPrice}</span>}
        </span>
      </div>
      <style>{`
        .product {
          overflow: hidden;
        }
        .product .thumb {
          position: relative;
          overflow: hidden;
        }
        .product .thumb .badges {
          position: absolute;
          z-index: 8;
          top: 8px;
          left: -2px;
          display: flex;
          flex-direction: column;
        }
        .product .thumb .badges span {
          font-size: 12px;
          line-height: 1.6;
          display: block;
          padding: 0 8px;
          text-align: center;
          text-transform: uppercase;
          border-radius: 3px;
          color: #fff;
          font-weight: 600;
        }
        .product .thumb .badges span + span {
          margin-top: 10px;
        }
        .product .thumb .badges span.new {
          background-color: #000000;
        }
        .product .thumb .badges span.sale {
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
        }
        .product .thumb .actions {
          position: absolute;
          z-index: 9;
          top: 8px;
          right: 8px;
          
          display: flex;
                  flex-direction: column;
          transition: all 0.3s ease 0s;
        }
        .product .thumb .actions .action {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 40px;
          height: 40px;
          transition: all 0.3s ease 0s;
          text-decoration: none;
          color: #000000;
          border-radius: 50%;
          background-color: transparent;
          font-size: 24px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .product .thumb .actions .action::before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
          z-index: -1;
          transition: opacity 0.3s linear;
          opacity: 0;
        }
        .product .thumb .actions .action:hover {
          color: #fff;
          box-shadow: 0 5px 15px 0 rgba(153, 63, 107, 0.5);
          transform: translateY(-1px);
        }
        .product .thumb .actions .action:hover::before {
          opacity: 1;
        }
        .product .thumb .actions .action + .action {
          margin-top: 10px;
        }
        .product .thumb .actions .action:not(.wishlist) {
          visibility: hidden;
          transform: translateY(20px);
          opacity: 0;
        }
        .product .thumb .actions .action.active {
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
        }
        .product .thumb .add-to-cart {
          display: block;
          width: 60%;
          height: 50px;
          line-height: 45px;
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
          text-align: center;
          border: 0;
          border-radius: 30px;
          font-size: 14px;
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          z-index: 11;
          margin: auto;
          font-weight: 600;
          visibility: hidden;
          transition: all 0.3s ease 0s;
          transform: translateY(20px);
          color: #fff;
          opacity: 0;
          text-transform: uppercase;
          overflow: hidden;
        }
        .product .thumb .add-to-cart::before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
          z-index: -1;
          transition: opacity 0.3s linear;
          opacity: 0;
        }
        .product .thumb .add-to-cart:hover {
          color: #fff;
          box-shadow: 0 5px 15px 0 rgba(153, 63, 107, 0.5);
          transform: translateY(-1px);
        }
        .product .thumb .add-to-cart:hover::before {
          opacity: 1;
        }
        .product .content {
          position: relative;
          z-index: 10;
          display: flex;
          
          flex-direction: column;
          padding: 30px 0px 0px 0px;
          transition: all 0.3s ease 0s;
          align-items: flex-start;
          background-color: #fff;
        }
        .product .content .ratings {
          display: flex;
          align-items: flex-start;
          margin-bottom: 4px;
        }
        
        .product .content .title {
          font-size: 16px;
          margin: 10px 0 10px;
        }
        .product .content .title a {
          text-decoration: none;
          color: #1d1d1d;
          font-size: 16px;
        }
        .product .content .price {
          font-size: 16px;
          line-height: 1;
        }
        .product .content .price:not(:last-child) {
          margin-bottom: 20px;
        }
        .product .content .price span.new {
          color: #1d1d1d;
          font-weight: 600;
        }
        .product .content .price span.old {
          font-size: 14px;
          margin-left: 10px;
          text-decoration: line-through;
          color: 
          ;
        }
        .product .content .btn {
          -ms-flex-item-align: center;
              -ms-grid-row-align: center;
              align-self: center;
        }
        .product:hover .thumb .image img {
          -webkit-transform: scale(1.1) rotate(3deg);
                  transform: scale(1.1) rotate(3deg);
        }
        .product:hover .thumb .image img:not(:last-child) {
          opacity: 0;
        }
        .product:hover .thumb .image img.hover-image {
          opacity: 1;
        }
        .product:hover .thumb .actions .action {
          visibility: visible;
          -webkit-transform: translateY(0);
                  transform: translateY(0);
          opacity: 1;
        }
        .product:hover .thumb .add-to-cart {
          visibility: visible;
          -webkit-transform: translateY(0);
                  transform: translateY(0);
          opacity: 1;
        }
        .product:hover .content .title a {
          color: #474747;
        }
        .product:hover .content .title a:hover {
          color: #fb5d5d;
        }
        
        .tab-content .tab-pane {
          display: block;
          overflow: hidden;
          height: 0;
          visibility: hidden;
          max-width: 100%;
          opacity: 0;
        }
        .tab-content .tab-pane.active {
          height: auto;
          visibility: visible;
          opacity: 1;
          overflow: visible;
        }
      `}</style>
    </div>
  );
};

export default SingleProduct;
