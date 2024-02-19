import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
import categoryReducer from "./slice/category";
import productsReducer from "./slice/product"
const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            category: categoryReducer,
            products: productsReducer
        },
    }
);

export default appStore;