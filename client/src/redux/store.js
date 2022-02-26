import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import  taskhistoryReducer from "./thistory"
import  taskReducer from "./task"
import  taskstatusReducer from "./tstatus"

export const store = configureStore({
  reducer: {
    auth: authReducer,
tasks:taskReducer,
taskstatus:taskstatusReducer,
taskhistory:taskhistoryReducer

  },
  middleware: [...getDefaultMiddleware()],
});
