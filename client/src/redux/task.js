import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  task: null,
  tasks: [],
  loading: false,
  loadingArticle: false,
  loadingDeleteing: false,
  errors: null,
};

// @GET /api/tasks

export const getTasks = createAsyncThunk(
    "tasks/gettasks",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/task");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
export const createTask = createAsyncThunk(
    "tasks/createtask",
    async (
      { title, description  },
      { rejectWithValue }
    ) => {
      try {
        const data = {
          title,
          description,
        
  
        };
        const response = await axios.post(
          "http://localhost:5000/api/task",
          data
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
      resetTasks(state) {
        state.posted = false
      }
    },
    extraReducers: {
        [getTasks.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getTasks.fulfilled]: (state, action) => {
            state.tasks = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getTasks.rejected]: (state, action) => {
            state.tasks = null;
            state.loading = false;
            state.errors = action.payload;
          },

          // ─── Create task ───────────────────────────────────────────────────────
          //
          [createTask.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [createTask.fulfilled]: (state, action) => {
            state.tasks = action.payload.tasks;
            state.posted = true
            state.loading = false;
            state.errors = null;
          },
          [createTask.rejected]: (state, action) => {
      
            state.loading = false;
            state.errors = action.payload;
          },
   
   
    },

    });

    export const { resetTasks } = taskSlice.actions
export default taskSlice.reducer;