import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signinApi, signupApi, validateTokenApi } from "../api/serverCalls";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "idle",
  errors: null,
};

export const validateToken = createAsyncThunk(
    "user/validate",
    async (arg, { rejectWithValue ,getState}) => {
      try {
        const token = getState().user.userInfo.token
        const response = await validateTokenApi(token)
        const data = {
            token: token,
            ...response.data,
          };
        localStorage.setItem("userInfo", JSON.stringify(data));

        return data;
      } catch (error) {
        let message ='Token expired or missing, please sign in.'
  
        localStorage.removeItem("userInfo");
        return rejectWithValue(message);
      }
    }
  );

export const signin = createAsyncThunk(
  "user/signin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const userInfo = await signinApi({
        username,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      let message = "";
      if (error.response && error.response.data) {
        for (const [key, value] of Object.entries(error.response.data)) {
          message += `${key}- ${value} \n`;
        }
      } else if (error.message) {
        message = error.message;
      }

      return rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (auth, { rejectWithValue }) => {
    try {
      const response = await signupApi(auth);
      return response.data;
    } catch (error) {
      let message = "";
      if (error.response && error.response.data) {
        for (const [key, value] of Object.entries(error.response.data)) {
          message += `${key}- ${value} \n`;
        }
      } else if (error.message) {
        message = error.message;
      }

      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init: (state) => {
      return { userInfo: null, status: "idle", errors: null };
    },
    signout: (state) => {
      localStorage.removeItem("userInfo");
      return { userInfo: null, status: "idle", errors: null };
    },
  },
  extraReducers: {
    [validateToken.pending]: (state, action) => {
        state.status = "loading";
      },
      [validateToken.fulfilled]: (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      },
      [validateToken.rejected]: (state, action) => {
        state.status = "failed";
        state.userInfo = null;
        state.errors = action.payload;
      },
    [signin.pending]: (state, action) => {
      state.status = "loading";
    },
    [signin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userInfo = action.payload;
      
    },
    [signin.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [signup.pending]: (state, action) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
  },
});

export const { signout, init } = userSlice.actions;

export default userSlice.reducer;
