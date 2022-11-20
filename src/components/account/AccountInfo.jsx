import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { update_user, auth_reset } from "../../redux/slices/Auth";
import Spinner from "../Spinner";

const AccountInfo = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { authPending, authMessage, authRejected, authAccepted } = useSelector(
    (state) => state.auth
  );

  const [newsletters, setNewsletters] = useState(false);
  const [offers, setoffers] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    mobile: "",
    dob: "",
    passwordnew: "",
    passwordnew2: "",
    offers,
    newsletters,
    password: "",
  });

  useEffect(() => {
    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
    if (authAccepted) {
      addToast("User Profile Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch(auth_reset());
  }, [addToast, dispatch, authMessage, authRejected, authAccepted]);

  const handleAccountChange = (e) => {
    setAccountFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (accountFormData.title === "") {
      addToast("You need to select your Gender", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (accountFormData.firstName === "") {
      addToast("You need to Provide the First names", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (accountFormData.lastName === "") {
      addToast("You need The Last names", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (accountFormData.mobile === "") {
      addToast("Contact info Needed", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else if (!accountFormData.mobile.startsWith("+")) {
      addToast("Invalid Contact, Add country Code", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else if (accountFormData.mobile.length < 9) {
      addToast("Contact Too Short", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (accountFormData.passwordnew !== "") {
      if (accountFormData.passwordnew.length < 7) {
        addToast("Password Too Short", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
    }

    if (accountFormData.passwordnew !== accountFormData.passwordnew2) {
      addToast("Password Don't Match", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (accountFormData.dob === "") {
      addToast("Date Of Birth is Required!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (accountFormData.password === "") {
      addToast("Input Your Password to Confirm Changes!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    let userData = {};
    userData.fullname =
      accountFormData.firstName + " " + accountFormData.lastName;
    userData.mobile = accountFormData.mobile;
    if (accountFormData.passwordnew) {
      userData.newPassword = accountFormData.passwordnew;
    }
    userData.dob = accountFormData.dob;
    userData.title = accountFormData.title;
    userData.newsletters = newsletters;
    userData.offers = offers;
    userData.passwordOld = accountFormData.password;

    console.log(userData);

    dispatch(update_user(userData));

    setAccountFormData({
      title: "",
      firstName: "",
      lastName: "",
      mobile: "",
      dob: "",
      passwordnew: "",
      passwordnew2: "",
      offers,
      newsletters,
      password: "",
    });
  };
  return (
    <>
      {authPending ? (
        <Spinner />
      ) : (
        <div className="block w-full">
          <h3 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
            Account details{" "}
          </h3>
          <p>
            Don't wanna Change A thing?{" "}
            <Link to="/products" className="font-semibold text-[#fb5d5d]">
              continue Shopping!
            </Link>
          </p>
          <form onSubmit={handleFormSubmit} onChange={handleAccountChange}>
            <div className="input-radio">
              <span className="font-semibold pr-[10px] custom-radio">
                <input
                  className="w-[15px] h-15px] mr-[2px] relative top-[2px]"
                  type="radio"
                  value="Mr"
                  name="title"
                />{" "}
                Mr.
              </span>
              <span className="font-semibold pr-[10px] custom-radio">
                <input
                  className="w-[15px] h-15px] mr-[2px] relative top-[2px]"
                  type="radio"
                  value="Mrs"
                  name="title"
                />{" "}
                Mrs.
              </span>
            </div>{" "}
            <br />
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="firstName"
              >
                First Name *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="text"
                name="firstName"
                placeholder="Llyod"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="lastName"
              >
                Last Name *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="text"
                name="lastName"
                placeholder="Hansen"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="mobile"
              >
                Mobile No. *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-black rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="tel"
                name="mobile"
                placeholder="+81 234 56789"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="password"
                name="passwordnew"
                placeholder="********"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="password"
              >
                Confirm New Password
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="password"
                name="passwordnew2"
                placeholder="********"
              />
            </div>
            <div className="default-form-box mb-[10px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="dob"
              >
                Birthdate *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="date"
                name="dob"
              />
            </div>
            <label className="checkbox-default" htmlFor="offers">
              <input
                className="w-[15px] h-[15px] mr-[2px] relative top-[2px]"
                type="checkbox"
                name="offers"
                onChange={() => setoffers(!offers)}
              />
              <span className="ml-2">Receive offers from our partners</span>
            </label>
            <br />
            <label className="mb-3" htmlFor="newsletterss">
              <input
                className="w-[15px] h-[15px] mr-[2px] relative top-[2px]"
                type="checkbox"
                name="newsletters"
                onChange={() => setNewsletters(!newsletters)}
              />
              <span className="ml-2">
                Sign up for our newsletters
                <br />
                <em className="mt-[14px] block leading-[24px]">
                  You may unsubscribe at any moment. For that purpose, please
                  find our contact info in the legal notice.
                </em>
              </span>
            </label>
            <div className="default-form-box my-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="password"
              >
                Enter Old Password To Confirm
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="password"
                name="password"
                placeholder="********"
              />
            </div>
            <button
              className="py-[10px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AccountInfo;
