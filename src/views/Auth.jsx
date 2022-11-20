import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login_user, auth_reset, register_user } from "../redux/slices/Auth";

import { Spinner } from "../components";

function Signin() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authPending, authMessage, authRejected, authAccepted } =
    useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSigninChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "") {
      addToast("Email Address Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.password === "") {
      addToast("Password Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.password.length <= 5) {
      addToast("Password Too Short", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    dispatch(login_user(formData));
    setFormData({ email: "", password: "" });
  };

  useEffect(() => {
    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }

    if (authAccepted) {
      addToast("Welcome Back User!", {
        appearance: "success",
        autoDismiss: true,
      });
    }

    if (user) {
      navigate("/account");
    }

    dispatch(auth_reset());
  }, [
    user,
    addToast,
    dispatch,
    navigate,
    authMessage,
    authRejected,
    authAccepted,
  ]);

  return (
    <>
      {authPending ? (
        <Spinner />
      ) : (
        <form onChange={handleSigninChange} onSubmit={handleSigninSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email *"
            className="bg-transparent border-[1px] w-full mb-[30px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            className="bg-transparent border-[1px] w-full mb-[30px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <div className="button-box">
            <div className="flex justify-between pt-[10px] px-0 pb-[19px]">
              <span>
                <input
                  type="checkbox"
                  className="h-[15px] m-0 relative top-[1px] w-[17px]"
                />
                <span className="hover:text-[#fb5d5d] cursor-pointer transition-all text-[15px] text-black">
                  Remember me
                </span>
              </span>
              <a
                className="hover:text-[#fb5d5d] transition-all text-[15px] text-black"
                href="/"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-[#f2f2f2] text-black cursor-pointer text-[14px] font-semibold px-[30px] py-5 leading-[1px] uppercase transition-all outline-none rounded-none hover:text-white hover:bg-[#fb5d5d]"
            >
              <span>Login</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authPending, authMessage, authRejected, authAccepted } =
    useSelector((state) => state.auth);

  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSignupChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (formData.fullname === "") {
      addToast("fullname Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.email === "") {
      addToast("Email Address Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.password === "") {
      addToast("Password Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.password.length <= 7) {
      addToast("Password Too Short", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (formData.password !== formData.password2) {
      addToast("Passwords Don't Match!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    const userData = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    };

    dispatch(register_user(userData));
    setFormData({
      fullname: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  useEffect(() => {
    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }

    if (authAccepted) {
      addToast("Thanks For Joining Us", {
        appearance: "success",
        autoDismiss: true,
      });
    }

    if (user) {
      navigate("/account");
    }

    dispatch(auth_reset());
  }, [
    user,
    addToast,
    dispatch,
    navigate,
    authMessage,
    authRejected,
    authAccepted,
  ]);

  return (
    <>
      {authPending ? (
        <Spinner />
      ) : (
        <form onChange={handleSignupChange} onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name *"
            className="bg-transparent border-[1px] w-full mb-[30px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <input
            name="email"
            placeholder="Email *"
            type="email"
            className="bg-transparent border-[1px] w-full mb-[30px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            className="bg-transparent border-[1px] w-full mb-[30px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <input
            type="password"
            name="password2"
            placeholder="Re-enter Password *"
            className="bg-transparent border-[1px] w-full mb-[20px] outline-none rounded-md p-[15px] text-[14px] border-[#ebebeb] focus:border-[#fb5d5d] transition-all italic placeholder:italic"
          />
          <a
            href={"/privacypolicy"}
            target={"_blank"}
            rel={"noreferrer"}
            className="italic text-[14px] text-[#7d7f84] transition-all hover:text-[#fb5d5d]"
          >
            Read the terms & Conditions of the Website
          </a>
          <div className="button-box mt-5">
            <button
              type="submit"
              className="bg-[#f2f2f2] text-black cursor-pointer text-[14px] font-semibold px-[30px] py-5 leading-[1px] uppercase transition-all outline-none rounded-none hover:text-white hover:bg-[#fb5d5d]"
            >
              <span>Register</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

const Auth = () => {
  let { pathname } = useLocation();

  return (
    <div className="py-5">
      <div className="mt-7 sm:mt-10">
        <p className="text-center text-[28px] sm:text-[40px] transition-all">
          {" "}
          <Link
            to={"/auth"}
            className="cursor-pointer hover:text-red-500 font-bold"
            style={{
              color: pathname === "/auth" ? "rgb(239, 68, 68)" : "black",
            }}
          >
            Login
          </Link>{" "}
          |{" "}
          <Link
            to={"/auth/signup"}
            className="cursor-pointer hover:text-red-500 font-bold"
            style={{
              color: pathname === "/auth/signup" ? "rgb(239, 68, 68)" : "black",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
      <div className="mt-8 mx-auto w-[85%] sm:w-3/4 md:w-1/2">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
