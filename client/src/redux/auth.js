import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  user: null,
  users: [],
  isAuthenticated: false,
  loading: true,
  errors: null,
};

// ─── LOGIN ──────────────────────────────────────────────────────────────────────
// @POST /api/auth/login
// email : string;
// password : string;
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "auth/getusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ─── REGISTER ──────────────────────────────────────────────────────────────────────
// @POST /api/auth/register
// firstname :string;
// lastname :string;
// usernamename :string;
// email : string;
// password : string;
export const register = createAsyncThunk(
  "auth/register",
  async (
    { firstname, lastname, username, email, password },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        firstname,
        lastname,
        username,
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//
// ─── ME ─────────────────────────────────────────────────────────────────────────
// @GET /api/auth/me
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//
// ─── ME ─────────────────────────────────────────────────────────────────────────
// @GET /api/auth/logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/auth/logout");
      dispatch(loadUser());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {


    [getUsers.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.users = null;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── LOGIN ───────────────────────────────────────────────────────
    //
    [login.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── REGISTER ───────────────────────────────────────────────────────
    //
    [register.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null;
    },
    [register.rejected]: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── Logout ───────────────────────────────────────────────────────
    //
    //!TODO ADD LOGOUT OVERLAY//
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    //
    // ─── Me ──---─────────────────────────────────────────────────────
    //
    [loadUser.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [loadUser.rejected]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
