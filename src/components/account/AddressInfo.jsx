import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";
import { update_user, auth_reset } from "../../redux/slices/Auth";
import Spinner from "../Spinner";

const AddressInfo = () => {
  const dispatch = useDispatch();
  const { authPending, authMessage, authRejected, authAccepted } = useSelector(
    (state) => state.auth
  );
  const { addToast } = useToasts();
  const [addressInfo, setAddressInfo] = useState({
    city: "",
    state: "",
    zipCode: "",
    country: "",
    passwordOld: "",
  });

  const handleAddressChange = (e) => {
    setAddressInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
    if (authAccepted) {
      addToast("User Address Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch(auth_reset());
  }, [addToast, dispatch, authMessage, authRejected, authAccepted]);

  return (
    <>
      {authPending ? (
        <Spinner />
      ) : (
        <div>
          <h5 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
            Billing address
          </h5>
          <form
            onChange={handleAddressChange}
            onSubmit={(e) => {
              e.preventDefault();

              if (addressInfo.city === "") {
                addToast("All Fields are required", {
                  appearance: "error",
                  autoDismiss: true,
                });
                return;
              }
              if (addressInfo.state === "") {
                addToast("All Fields are required", {
                  appearance: "error",
                  autoDismiss: true,
                });
                return;
              }
              if (addressInfo.zipCode === "") {
                addToast("All Fields are required", {
                  appearance: "error",
                  autoDismiss: true,
                });
                return;
              }
              if (addressInfo.country === "") {
                addToast("All Fields are required", {
                  appearance: "error",
                  autoDismiss: true,
                });
                return;
              }

              if (addressInfo.passwordOld === "") {
                addToast("Password Required to Confirm Changes", {
                  appearance: "error",
                  autoDismiss: true,
                });
                return;
              }

              dispatch(update_user(addressInfo));

              setAddressInfo({
                city: "",
                state: "",
                zipCode: "",
                country: "",
                passwordOld: "",
              });
            }}
          >
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block pl-4"
                htmlFor="city"
              >
                City *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="text"
                name="city"
                placeholder="Kampala"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block pl-4"
                htmlFor="state"
              >
                State *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="text"
                name="state"
                placeholder="Kansas"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block pl-4"
                htmlFor="zipCode"
              >
                Zip Code *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-black rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="tel"
                name="zipCode"
                placeholder="10101"
              />
            </div>
            <div className="default-form-box mb-[20px]">
              <label
                className="font-normal text-[16px] mb-[10px] block pl-4"
                htmlFor="country"
              >
                Country *
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="text"
                name="country"
                placeholder="Uganda"
              />
            </div>
            <div className="default-form-box my-[30px]">
              <label
                className="font-normal text-[16px] mb-[10px] block"
                htmlFor="passwordOld"
              >
                Enter Your Password To Confirm.
              </label>
              <input
                className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                type="password"
                name="passwordOld"
                placeholder="********"
              />
            </div>
            <button
              className="py-[10px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
              type="submit"
            >
              Update Address
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddressInfo;
