import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doLogin = createAsyncThunk("/user/signin", async (payload, thunkAPI) => {
  try {
    const response = await axios.post("/login", { email: payload.email, password: payload.password });
    return response.data;
  } catch (error) {

    if (error.response && error.response.status === 400) {
      return thunkAPI.rejectWithValue({ message: 'Invalid credentials provided' });
    }
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const getUser = createAsyncThunk("/tokenLogin", async (token, thunkAPI) => {
  try {
    const response = await axios.post("/token-login", { token: token });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    id: null,
    error: "",
    SignUpError: "",
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    getToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    setUser: (state, { payload }) => {
      state.user = payload;

    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = null;
      state.error = "";
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doLogin.fulfilled, (state, { payload }) => {
        if (payload.token) {
          axios.defaults.headers.common["Authorization"] = 'Bearer ' + payload.token;
          localStorage.setItem("token", payload.token);
          state.id = payload.id;
          state.user = payload;
          state.token = payload.token;
          state.isLoading = false;
        } else {
          state.error = payload.message;
          state.isLoading = false;
        }
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : "Server error";
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        if (payload.token) {
          state.user = payload;
          state.token = payload.token;
        } else {
          state.error = payload.message;
          state.isLoading = false;
        }
      })
  },
});

export const { getToken, logOut, resetError, setUser } = userSlice.actions;

export default userSlice.reducer;
