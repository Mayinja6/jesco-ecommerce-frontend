import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout_user } from "../redux/slices/Auth";

import logo from "../assets/imgs/logo.png";

import { Avatar, ClickAwayListener, Drawer } from "@mui/material";
import { WishlistDrawer, CartDrawer, MobileDrawer } from "../components";
import { useScrollposition } from "../utils/useScrollPosition";

const Header = () => {
  const scrollPosition = useScrollposition();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const { user } = useSelector((state) => state.auth);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [openWishlistDrawer, setOpenWishlistDrawer] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);

  return (
    <header
      className="flex flex-row justify-between items-center w-full py-4 md:py-8 px-8 md:px-20 sticky top-0 z-50 bg-white"
      style={{
        boxShadow:
          scrollPosition > 10 ? "2px 4px 8px rgba(51, 51, 51, 0.25)" : "none",
      }}
    >
      {/* Website Logo */}
      <div className="flex items-center relative">
        <Link to={"/"}>
          <img src={logo} className="cursor-pointer" alt="Logo" />
        </Link>
      </div>
      {/* Dektop Navigation */}
      <div className="hidden lg:inline">
        <ul className="py-0 list-none flex">
          {[
            { name: "home", to: "/" },
            {
              name: "shop",
              to: "/products",
              otherLinks: [
                { name: "Cart", to: "/cart" },
                { name: "Wishlist", to: "/wishlist" },
                { name: "Checkout", to: "/checkout" },
              ],
            },
            { name: "About Us", to: "about" },
            { name: "Contact Us", to: "/contact" },
          ].map((link, i) => {
            return (
              <div key={i} className="mr-[20px] last:mr-0">
                <Link
                  to={link.to}
                  className="text-black font-semibold cursor-pointer transition-all hover:text-[#fb5d5d] uppercase"
                  style={{ fontFamily: "Montserrat Alternates" }}
                >
                  {link.name}
                </Link>
                {link.otherLinks && (
                  <ClickAwayListener onClickAway={() => setShopDropdown(false)}>
                    <span className="ml-1 ">
                      <i
                        className="fa fa-arrow-down cursor-pointer hover:text-[#fb5d5d]  transition-colors p-[2px] rounded-[50%] bg-white"
                        onClick={() => setShopDropdown(!shopDropdown)}
                      ></i>
                      {shopDropdown ? (
                        <div className="transition-all duration-500 dropdown-menu py-[15px] px-[25px]">
                          <ul>
                            {link.otherLinks.map((link, i) => {
                              return (
                                <span
                                  className="block relative mb-2 pb-2 last:pb-0 border-b last:border-b-0"
                                  key={i}
                                >
                                  <Link
                                    to={link.to}
                                    onClick={() =>
                                      setShopDropdown(!shopDropdown)
                                    }
                                    className="text-black font-semibold cursor-pointer transition-all hover:text-[#fb5d5d] uppercase"
                                    style={{
                                      fontFamily: "Montserrat Alternates",
                                    }}
                                  >
                                    {link.name}
                                  </Link>
                                </span>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </span>
                  </ClickAwayListener>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      {/* Links */}
      <div className="flex justify-center items-center">
        {/* Sign in Button */}
        {user ? (
          <ClickAwayListener onClickAway={() => setUserDropdown(false)}>
            <span className="w-[28px] h-[28px] relative cursor-pointer">
              <Avatar
                src={
                  user.avatar.filename !== ""
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/users/avatar/${user.avatar.filename}`
                    : ""
                }
                sx={{
                  zIndex: "5px",
                  width: "100%",
                  height: "100%",
                  objectFit: "center",
                }}
                onClick={() => setUserDropdown(!userDropdown)}
                alt="User-avatar"
              />
              {userDropdown ? (
                <div
                  className={`dropdown-menu cursor-default ${
                    userDropdown ? "inline-block" : "hidden"
                  } py-[10px] px-[18px] w-[150px]`}
                >
                  <ul className="flex flex-col items-center">
                    <li
                      className="text-center font-bold pb-2 border-b block"
                      style={{
                        background:
                          "linear-gradient(-96deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {user && user.fullname.split(" ")[0]}
                      {!user && "Lyod"}
                    </li>
                    <li>
                      <Link
                        to="/account"
                        className="flex py-[5px] items-center"
                        onClick={() => setUserDropdown(!userDropdown)}
                      >
                        <i className="fa fa-user-circle"></i>
                        <span className="ml-2 hover:text-[#fb5d5d] transition-colors cursor-pointer">
                          Account
                        </span>
                      </Link>
                    </li>

                    {user.isAdmin && (
                      <li>
                        <Link
                          to="/admin/users"
                          className="py-[5px]"
                          onClick={() => setUserDropdown(!userDropdown)}
                        >
                          <i className="fa fa-users"></i>
                          <span className="ml-2 hover:text-[#fb5d5d] transition-colors cursor-pointer">
                            Users list
                          </span>
                        </Link>
                      </li>
                    )}
                    {user.isAdmin && (
                      <li>
                        <Link
                          to="/products/new"
                          className="py-[5px] "
                          onClick={() => setUserDropdown(!userDropdown)}
                        >
                          <i className="fa fa-product-hunt"></i>
                          <span className="ml-2 hover:text-[#fb5d5d] transition-colors cursor-pointer">
                            New
                          </span>
                        </Link>
                      </li>
                    )}

                    <li>
                      <div className="flex py-[5px] items-center  cursor-pointer">
                        <i className="fa fa-sign-out"></i>
                        <span
                          className="ml-2 hover:text-[#fb5d5d] transition-colors"
                          onClick={() => dispatch(logout_user())}
                        >
                          Sign Out
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : null}
            </span>
          </ClickAwayListener>
        ) : (
          <Link
            to={"/auth"}
            className="text-[#fb5d5d] text-sm sm:text-base cursor-pointer sm:font-semibold transition-all"
          >
            Sign In
          </Link>
        )}
        {/* Shop Quick Links */}
        <div>
          <ul className="flex items-center">
            <li className="ml-[10px] md:ml-[20px]">
              <i className="transition-all hover:text-[#fb5d5d] cursor-pointer fa fa-search"></i>
            </li>

            <li className="ml-[10px] md:ml-[20px] relative">
              <i
                className="transition-all hover:text-[#fb5d5d] cursor-pointer fa fa-heart-o"
                onClick={() => setOpenWishlistDrawer(true)}
              ></i>
              {wishlistItems.length <= 0 ? (
                <></>
              ) : (
                <span
                  onClick={() => setOpenWishlistDrawer(true)}
                  className="cart-qty"
                >
                  {wishlistItems.length < 10
                    ? `0${wishlistItems.length}`
                    : wishlistItems.length}
                </span>
              )}
              <Drawer
                open={openWishlistDrawer}
                anchor="right"
                onClose={() => setOpenWishlistDrawer(false)}
              >
                <WishlistDrawer setOpenWishlistDrawer={setOpenWishlistDrawer} />
              </Drawer>
            </li>

            <li className="ml-[10px] md:ml-[20px] relative">
              <i
                className="transition-all hover:text-[#fb5d5d] cursor-pointer fa fa-shopping-cart"
                onClick={() => setOpenCartDrawer(true)}
              ></i>
              {cartItems.length <= 0 ? (
                <></>
              ) : (
                <span
                  onClick={() => setOpenCartDrawer(true)}
                  className="cart-qty"
                >
                  {cartItems.length < 10
                    ? `0${cartItems.length}`
                    : cartItems.length}
                </span>
              )}

              <Drawer
                open={openCartDrawer}
                anchor="right"
                onClose={() => setOpenCartDrawer(false)}
              >
                <CartDrawer setOpenCartDrawer={setOpenCartDrawer} />
              </Drawer>
            </li>

            <div className="inline lg:hidden">
              <li className="ml-[10px] md:ml-[20px]">
                <i
                  className="transition-all hover:text-[#fb5d5d] cursor-pointer fa fa-bars"
                  onClick={() => setOpenMobileDrawer(true)}
                ></i>
                <Drawer
                  open={openMobileDrawer}
                  anchor="left"
                  onClose={() => setOpenMobileDrawer(false)}
                  sx={{
                    transition: "0.3s all ease-in-out",
                  }}
                >
                  <MobileDrawer setOpenMobileDrawer={setOpenMobileDrawer} />
                </Drawer>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <style>{`
        .drawer-div {
          font-size: 14px;
          font-weight: normal;
          display: block;
          max-width: 100%;
          padding: 20px;
          transition: all 0.5s ease 0s;
          background: #fff;
        }
                  
        .drawerBtn-close {
          position: relative;
          cursor: pointer;
          width: 20px;
          height: 20px;
          text-indent: -99999px;
          border: 0;
          background: transparent;
        }

        .drawerBtn-close::after {
          position: absolute;
          top: calc(50% - 1px);
          left: 0;
          width: 20px;
          height: 2px;
          content: "";
          transition: all 0.5s ease 0s;
          transform: rotate(-45deg);
          background: #fb5d5d;
        }

        .drawerBtn-close::before {
          position: absolute;
          top: calc(50% - 1px);
          left: 0;
          width: 20px;
          height: 2px;
          content: "";
          transition: all 0.5s ease 0s;
          transform: rotate(45deg);
          background-color: #fb5d5d;
        }
        .drawerBtn-close:hover::before {
          transform: rotate(180deg);
        }

        .drawerBtn-close:hover::after {
          transform: rotate(0deg);
        }

        .cart-qty {
          font-size: 11px;
          font-weight: 700;
          position: absolute;
          z-index: 2;
          top: -10px;
          right: -8px;
          display: flex;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          border-radius: 50%;
          background-color: #fb5d5d;
          width: 18px;
          height: 18px;
        }
        .dropdown-menu {
          position: absolute;
          border: 1px solid #ededed;
          background: #fff;
          border-radius: 8px;
          z-index: 999999;
        }
      `}</style>
    </header>
  );
};

export default Header;
