import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Avatar } from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import {
  get_All_dbUsers,
  user_deletion,
  admin_delete_user,
} from "../../redux/slices/Auth";
import { Spinner } from "../../components";
import { server_down } from "../../assets/imgs";

const AllUsers = () => {
  const [adminDeletUser, setAdminDeletUser] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { authPending, authMessage, authRejected, dbUsers, userRemoved } =
    useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_All_dbUsers());

    if (authRejected) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
    if (userRemoved) {
      addToast("User Has Been succesfully removed from the DATABASE!", {
        appearance: "info",
        autoDismiss: true,
      });
    }
    dispatch(user_deletion());
  }, [addToast, dispatch, authMessage, authRejected, userRemoved]);

  return (
    <>
      {authPending && (
        <>
          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Users list loading Please Wait...
          </h1>
          <Spinner />
        </>
      )}
      {authRejected && (
        <div className="w-full relative h-[85vh]  flex flex-col items-center justify-evenly p-10">
          <img
            src={server_down}
            className="max-w-full w-full sm:w-[75%] md:w-[50%] lg:w-[40%] h-auto"
            alt="Server Down"
          />

          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Check your network and try again
          </h1>
        </div>
      )}
      {dbUsers && (
        <div className="block w-full overflow-scroll md:overflow-hidden p-5">
          <h4 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold text-center">
            Users In The Database
          </h4>
          {dbUsers.length <= 0 && (
            <h1>You Are the Only Person in the Database</h1>
          )}
          {dbUsers.length > 0 && (
            <table className="sm:w-full border-collapse border border-[#ededed] ">
              <thead className="bg-[#f2f2f2]">
                <tr>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    Picture
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    Fullname
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    Administrator?
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    Products
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    email
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    mobile
                  </th>
                  <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {dbUsers.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td className="border border-[#ededed] min-w-[100px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
                        <div className="flex items-center justify-center">
                          <Avatar
                            src={
                              user.avatar.filename !== ""
                                ? `${process.env.REACT_APP_BACKEND_URL}/api/users/avatar/${user.avatar.filename}`
                                : ""
                            }
                            sx={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      </td>
                      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
                        {user.fullname}
                      </td>
                      <td className="border border-[#ededed]  border-r-[#ededed] border-r capitalize p-[5px] text-center">
                        {user.isAdmin ? "true" : "false"}
                      </td>
                      <td className="border border-[#ededed]  border-r-[#ededed] border-r capitalize p-[5px] text-center">
                        {user.products.length}
                      </td>
                      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r p-[10px] text-center">
                        <a
                          className="hover:text-[#fb5d5d] transition-all"
                          href={`mailto:${user.email}`}
                        >
                          {user.email}
                        </a>
                      </td>
                      <td className="border italic border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
                        {user.mobile !== "" ? (
                          <a
                            className="hover:text-[#fb5d5d] transition-all"
                            href={`tel:${user.mobile}`}
                          >
                            {user.mobile}
                          </a>
                        ) : (
                          "null"
                        )}
                      </td>
                      <td className="border border-[#ededed] border-r-[#ededed] border-r text-center">
                        {user.isAdmin ? (
                          <span className="font-bold transition-all cursor-not-allowed">
                            Admin
                          </span>
                        ) : (
                          <>
                            <span
                              className="hover:text-[#fb5d5d] transition-all cursor-pointer"
                              onClick={() => setAdminDeletUser(true)}
                            >
                              Delete
                            </span>
                            <Dialog
                              open={adminDeletUser}
                              onClose={() => setAdminDeletUser(false)}
                              aria-labelledby="dialog-title"
                              aria-describedby="dialog-description"
                            >
                              <DialogTitle id="dialog-title">
                                Delete {user.fullname}?
                              </DialogTitle>
                              <DialogContent id="dialog-description">
                                <DialogContentText>
                                  User <b className="italic">{user.fullname}</b>{" "}
                                  and his Profile Picture will be deleted from
                                  the Database, Are you sure?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-[#fb5d5d]"
                                  onClick={() => setAdminDeletUser(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black"
                                  onClick={() => {
                                    setAdminDeletUser(false);
                                    dispatch(admin_delete_user(user._id));
                                  }}
                                >
                                  Confirm
                                </button>
                              </DialogActions>
                            </Dialog>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default AllUsers;
