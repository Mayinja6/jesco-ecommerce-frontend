import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { ScrollToTopParams } from "../../utils/ScrollToTop";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  logout_user,
  user_deletion,
  delete_myAccount,
} from "../../redux/slices/Auth";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  AccountInfo,
  AddressInfo,
  OrderInfo,
  UserAvatar,
} from "../../components";

const Account = () => {
  const [deleteMyAccount, setDeleteMyAccount] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { user, userRemoved } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(user_deletion());
    if (userRemoved) {
      addToast("Your Account Has been succefully Deleted from the Database!", {
        appearance: "info",
        autoDismiss: true,
      });
      setTimeout(() => {
        dispatch(logout_user());
        window.location.assign("/");
      }, 1000);
    }
  }, [addToast, dispatch, userRemoved]);

  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTopParams />
      <div className="p-5  sm:p-[80px]">
        <div className="w-full md:flex md:gap-8">
          <ul className="md:sticky md:top-[300px] mb-[25px] md:mb-0 md:flex-auto w-full md:w-1/4 flex flex-col">
            <li className="mb-[10px]">
              <Link
                to="/account"
                className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] text-white transition-colors delay-150 ${
                  pathname === "/account" ? "bg-[#fb5d5d]" : "bg-black"
                } uppercase block`}
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link
                to="/account/accountinfo"
                className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] text-white transition-colors delay-150 ${
                  pathname === "/account/accountinfo" ||
                  pathname === "/account/accountinfo/edit"
                    ? "bg-[#fb5d5d]"
                    : "bg-black"
                } uppercase block`}
              >
                Account details
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link
                to="/account/avatar"
                className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] text-white transition-colors delay-150 ${
                  pathname === "/account/avatar" ? "bg-[#fb5d5d]" : "bg-black"
                } uppercase block`}
              >
                Profile Picture
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link
                to="/account/address"
                className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] text-white transition-colors delay-150 ${
                  pathname === "/account/address" ||
                  pathname === "/account/address/edit"
                    ? "bg-[#fb5d5d]"
                    : "bg-black"
                } uppercase block`}
              >
                Addresses
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link
                to="/account/orders"
                className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] text-white transition-colors delay-150 ${
                  pathname === "/account/orders" ? "bg-[#fb5d5d]" : "bg-black"
                } uppercase block`}
              >
                Orders
              </Link>
            </li>
            {user.isAdmin ? (
              user.products.length <= 0 ? (
                <li className="mb-[10px]">
                  <span
                    to="/account/orders"
                    className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] bg-black text-white transition-colors delay-150 uppercase block cursor-pointer`}
                    onClick={() => setDeleteMyAccount(true)}
                  >
                    Delete Account
                  </span>
                  <Dialog
                    open={deleteMyAccount}
                    onClose={() => setDeleteMyAccount(false)}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                  >
                    <DialogTitle id="dialog-title">
                      Delete Your Account <b>({user.fullname})</b>?
                    </DialogTitle>
                    <DialogContent id="dialog-description">
                      <DialogContentText>
                        You are About To delete Your Profile from the Database,
                        this Action is irreverable, are you sure?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button
                        className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-[#fb5d5d]"
                        onClick={() => setDeleteMyAccount(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black"
                        onClick={() => {
                          setDeleteMyAccount(false);
                          dispatch(delete_myAccount(user.id));
                        }}
                      >
                        Confirm
                      </button>
                    </DialogActions>
                  </Dialog>
                </li>
              ) : (
                <></>
              )
            ) : (
              <li className="mb-[10px]">
                <span
                  className={`font-semibold py-3 px-4 hover:bg-[#fb5d5d] bg-black text-white transition-colors delay-150 uppercase block cursor-pointer`}
                  onClick={() => setDeleteMyAccount(true)}
                >
                  Delete Account
                </span>
                <Dialog
                  open={deleteMyAccount}
                  onClose={() => setDeleteMyAccount(false)}
                  aria-labelledby="dialog-title"
                  aria-describedby="dialog-description"
                >
                  <DialogTitle id="dialog-title">
                    Delete Your Account <b>({user.fullname})</b>?
                  </DialogTitle>
                  <DialogContent id="dialog-description">
                    <DialogContentText>
                      You are About To delete Your Profile from the Database,
                      this Action is irreverable, are you sure?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <button
                      className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-[#fb5d5d]"
                      onClick={() => setDeleteMyAccount(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black"
                      onClick={() => {
                        setDeleteMyAccount(false);
                        dispatch(delete_myAccount(user.id));
                      }}
                    >
                      Confirm
                    </button>
                  </DialogActions>
                </Dialog>
              </li>
            )}

            <li className="mb-[10px]">
              <p
                className="font-semibold py-3 px-4 text-white uppercase block bg-black hover:bg-[#fb5d5d] cursor-pointer "
                onClick={() => dispatch(logout_user())}
              >
                Sign Out
              </p>
            </li>
          </ul>
          <div className="md:flex-auto w-full md:w-3/4">
            <div className="w-full">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="block w-full">
                      <h4 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Dashboard{" "}
                      </h4>
                      <p>
                        From your account dashboard. you can easily check &amp;
                        view your{" "}
                        <Link className="text-[#fb5d5d]" to="/account/orders">
                          recent orders
                        </Link>
                        , manage your{" "}
                        <Link className="text-[#fb5d5d]" to="/account/address">
                          shipping and billing addresses
                        </Link>{" "}
                        and{" "}
                        <Link
                          className="text-[#fb5d5d]"
                          to="/account/accountinfo"
                        >
                          Edit your password and account details.
                        </Link>
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/accountinfo"
                  element={
                    <div className="block w-full">
                      <h3 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Account details{" "}
                      </h3>
                      <Link
                        to="/account/accountinfo/edit"
                        className="text-blue-600 hover:text-[#fb5d5d]"
                      >
                        Edit
                      </Link>
                      <p className="mb-2">
                        <strong className="text-[16px] sm:text-[20px]">
                          {user.fullname || "Lyod Hansen"}
                        </strong>
                      </p>
                      <div>
                        <span className="mb-1 d-inline-block">
                          <strong>First Name:</strong>
                          {user.fullname.split(" ")[0] || "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Last Name:</strong>{" "}
                          {user.fullname.split(" ")[1] || "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Email:</strong> {user.email || "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Mobile:</strong> {user.mobile || "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Date Of Birth:</strong>{" "}
                          {user.dob
                            ? new Date(user.dob).toLocaleDateString("en-us", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Not Set"}
                        </span>
                        .
                        <br />
                      </div>
                    </div>
                  }
                />
                <Route path="/accountinfo/edit" element={<AccountInfo />} />
                <Route path="/avatar" element={<UserAvatar />} />
                <Route
                  path="/address"
                  element={
                    <div className="block w-full">
                      <p>
                        The following addresses will be used on the checkout
                        page by default.
                      </p>
                      <h5 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Billing address
                      </h5>
                      <Link
                        to="/account/address/edit"
                        className="text-blue-600 hover:text-[#fb5d5d]"
                      >
                        Edit
                      </Link>
                      <p className="mb-2">
                        <strong className="text-[16px] sm:text-[20px]">
                          {user.fullname || "Lyod Hansen"}
                        </strong>
                      </p>
                      <div>
                        <span className="mb-1 d-inline-block">
                          <strong>City:</strong>{" "}
                          {user.address.city !== ""
                            ? user.address.city
                            : "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>State:</strong>{" "}
                          {user.address.state !== ""
                            ? user.address.state
                            : "Not Set"}
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>ZIP:</strong>{" "}
                          {user.address.zipCode !== ""
                            ? user.address.zipCode
                            : "Not Set"}
                        </span>
                        ,
                        <br />
                        <span>
                          <strong>Country:</strong>{" "}
                          {user.address.country !== ""
                            ? user.address.country
                            : "Not Set"}
                          .
                        </span>
                      </div>
                    </div>
                  }
                />
                <Route path="/address/edit" element={<AddressInfo />} />
                <Route path="/orders" element={<OrderInfo />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
