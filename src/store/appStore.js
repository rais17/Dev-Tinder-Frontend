import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "../services/api/baseApi";
import chatReducer from "./chatSlice";

const appStore = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        alert: alertReducer,
        chat: chatReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(appStore.dispatch);

export default appStore;