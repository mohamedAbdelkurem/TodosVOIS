import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  taskst: null,
  taskstatus: [],
  loading: false,
  loadingTaskStatus: false,
  loadingDeleteing: false,
  errors: null,
};

// @GET /api/tasks

export const getTaskStatus = createAsyncThunk(
    "tstatus/gettaskstatus",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/tstatus");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
export const createTaskStatus = createAsyncThunk(
    "tstatus/createtaskstatus",
    async (
      { name  },
      { rejectWithValue }
    ) => {
      try {
        const data = {
            name
        
  
        };
        const response = await axios.post(
          "http://localhost:5000/api/tstatus",
          data
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  const taskstatusSlice = createSlice({
    name: "tstatus",
    initialState,
    reducers: {
      resetTaskstatus(state) {
        state.posted = false
      }
    },
    extraReducers: {
        [getTaskStatus.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getTaskStatus.fulfilled]: (state, action) => {
            state.taskstatus = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getTaskStatus.rejected]: (state, action) => {
            state.taskstatus = null;
            state.loading = false;
            state.errors = action.payload;
          },

          // ─── Create task ───────────────────────────────────────────────────────
          //
          [createTaskStatus.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [createTaskStatus.fulfilled]: (state, action) => {
            state.taskstatus = action.payload.taskstatus;
            state.posted = true
            state.loading = false;
            state.errors = null;
          },
          [createTaskStatus.rejected]: (state, action) => {
      
            state.loading = false;
            state.errors = action.payload;
          },
   
   
    },

    });

    export const { resetTaskstatus } = taskstatusSlice.actions
export default taskstatusSlice.reducer;