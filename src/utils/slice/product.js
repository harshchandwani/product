import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: null,
        selectedproduct: null
    },
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload;
        },
        addSelectedProduct: (state, action) => {
            state.selectedproduct = action.payload;
        }
    }
})
export const { addProducts, addSelectedProduct } = productSlice.actions;
export default productSlice.reducer;