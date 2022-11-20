import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";
import { auth_reset, update_user_avatar } from "../../redux/slices/Auth";

import { Spinner } from "../../components";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const { authPending, authMessage, authRejected, authAccepted } = useSelector(
    (state) => state.auth
  );

  const { addToast } = useToasts();
  const [image, setImage] = useState({ preview: "", file: "" });

  const handleAvatarOnChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    };
    setImage(img);
  };

  const handleAvatarFormSubmit = (e) => {
    e.preventDefault();
    if (image.file === "") {
      console.log("No Image File");
      return;
    }
    if (image.file.type.split("/")[0] !== "image") {
      addToast("Only Images Required", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    let formData = new FormData();
    formData.append("avatar", image.file);

    dispatch(update_user_avatar(formData));
    setImage({ preview: "", file: "" });
  };

  useEffect(() => {
    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }

    if (authAccepted) {
      addToast("Profile Picture Updated", {
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
        <div
          className={`p-5 flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between md:justify-evenly items-center`}
        >
          {image.preview === "" ? (
            <Avatar sx={{ width: "150px", height: "150px" }} />
          ) : (
            <img
              className="rounded-full object-cover w-[150px] h-[150px]"
              src={image.preview}
              alt="Avatar_photo"
            />
          )}
          <form onSubmit={handleAvatarFormSubmit}>
            {image.preview === "" ? (
              <input
                type="file"
                name="avatar"
                className="fileuploadInput w-[154px]"
                onChange={handleAvatarOnChange}
              />
            ) : (
              <button
                type="submit"
                className="py-[10px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
              >
                Submit
              </button>
            )}
          </form>
          <style>{`
      .fileuploadInput::-webkit-file-upload-button {
        display: none;
      }
      
      .fileuploadInput::before {
        content: "Choose Profile image";
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
      }
      
      .fileuploadInput:hover::before {
        border-color: black;
      }
      
      .fileuploadInput:active::before {
        background: linear-gradient(top, #e3e3e3, #f9f9f9);
      }
    `}</style>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
