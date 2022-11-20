import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reduxContollers from "../reduxControllers";

const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  user: user || null,
  authPending: false,
  authRejected: false,
  authAccepted: false,
  authMessage: "",
  userRemoved: false,
};

export const get_All_dbUsers = createAsyncThunk("auth/allDbUsers", async () => {
  return await reduxContollers.get_All_dbUsers();
});

// Registering A User Action
export const register_user = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await reduxContollers.register_user(userData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// Loging In Action
export const login_user = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await reduxContollers.login_user(userData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// Loggging Out Action
export const logout_user = createAsyncThunk("auth/logout", async () => {
  await reduxContollers.logout_user();
});

// Updating A User Action
export const update_user = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      return await reduxContollers.updateUser(userData);
    } catch (err) {
      console.log({ updateErr: err });
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// Updating User Avatar Action
export const update_user_avatar = createAsyncThunk(
  "auth/updateAvatar",
  async (UserAvatar, thunkAPI) => {
    try {
      return await reduxContollers.updateUserAvatar(UserAvatar);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// AdminDeleting User Action
export const admin_delete_user = createAsyncThunk(
  "auth/admin_delete",
  async (userId, thunkAPI) => {
    try {
      return await reduxContollers.admin_delete_user(userId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// Deleting User Action
export const delete_myAccount = createAsyncThunk(
  "auth/user_delete",
  async (userId, thunkAPI) => {
    try {
      return await reduxContollers.delete_user(userId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_reset: (state) => {
      state.authPending = false;
      state.authRejected = false;
      state.authAccepted = false;
      state.authMessage = "";
    },
    user_deletion: (state) => {
      state.userRemoved = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register_user.pending, (state) => {
        state.authPending = true;
      })
      .addCase(register_user.rejected, (state, action) => {
        state.authPending = false;
        state.authRejected = true;
        state.authMessage = action.payload;
      })
      .addCase(register_user.fulfilled, (state, action) => {
        state.authPending = false;
        state.user = action.payload;
        state.authAccepted = true;
      })
      .addCase(login_user.pending, (state) => {
        state.authPending = true;
      })
      .addCase(login_user.rejected, (state, action) => {
        state.authPending = false;
        state.authRejected = true;
        state.authMessage = action.payload;
      })
      .addCase(login_user.fulfilled, (state, action) => {
        state.authPending = false;
        state.user = action.payload;
        state.authAccepted = true;
      })
      .addCase(update_user.pending, (state) => {
        state.authPending = true;
      })
      .addCase(update_user.rejected, (state, action) => {
        state.authPending = false;
        state.authRejected = true;
        state.authMessage = action.payload;
      })
      .addCase(update_user.fulfilled, (state, action) => {
        state.authPending = false;
        state.user = action.payload;
        state.authAccepted = true;
      })
      .addCase(update_user_avatar.pending, (state) => {
        state.authPending = true;
      })
      .addCase(update_user_avatar.rejected, (state, action) => {
        state.authPending = false;
        state.authRejected = true;
        state.authMessage = action.payload;
      })
      .addCase(update_user_avatar.fulfilled, (state, action) => {
        state.authPending = false;
        state.user = action.payload;
        state.authAccepted = true;
      })
      .addCase(get_All_dbUsers.pending, (state) => {
        state.authPending = true;
      })
      .addCase(get_All_dbUsers.fulfilled, (state, action) => {
        state.authPending = false;
        state.dbUsers = action.payload;
        state.authAccepted = true;
      })
      .addCase(get_All_dbUsers.rejected, (state, action) => {
        state.authPending = false;
        state.authRejected = true;
        state.authMessage = action.error.message;
      })
      .addCase(admin_delete_user.pending, (state) => {
        state.authPending = true;
      })
      .addCase(admin_delete_user.rejected, (state, action) => {
        state.authMessage = action.payload;
        state.authPending = false;
        state.authRejected = true;
      })
      .addCase(admin_delete_user.fulfilled, (state, action) => {
        state.userRemoved = true;
        state.authPending = false;
        state.authAccepted = true;
        state.dbUsers = action.payload;
      })
      .addCase(delete_myAccount.pending, (state) => {
        state.authPending = true;
      })
      .addCase(delete_myAccount.rejected, (state, action) => {
        state.authRejected = true;
        state.authPending = false;
        state.authMessage = action.payload;
      })
      .addCase(delete_myAccount.fulfilled, (state, action) => {
        state.authPending = false;
        state.authAccepted = true;
        state.userRemoved = true;
      });
  },
});

export default AuthSlice.reducer;
export const { auth_reset, user_deletion } = AuthSlice.actions;
