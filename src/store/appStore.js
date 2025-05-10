import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "../services/api/baseApi";

const appStore = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        alert: alertReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(appStore.dispatch);

export default appStore;