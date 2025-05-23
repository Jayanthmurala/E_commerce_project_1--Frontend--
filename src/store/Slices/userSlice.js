import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    role: "",
    address_details: [],
    orderHistory: [],
    shopping_cart: [],
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar;
      state.mobile = action.payload?.mobile;
      state.role = action.payload?.role;
      state.address_details = action.payload?.address_details;
      state.orderHistory = action.payload?.orderHistory;
      state.shopping_cart = action.payload?.shopping_cart;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
