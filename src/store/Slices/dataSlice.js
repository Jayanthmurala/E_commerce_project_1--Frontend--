import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: [],
  subCategories: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

export const { setProducts, setCategory, setSubCategories } = dataSlice.actions;
export default dataSlice.reducer;
