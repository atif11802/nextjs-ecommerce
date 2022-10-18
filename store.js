import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";

export default configureStore({
	reducer: {
		cart: cartReducer,
		checkout: checkoutSlice,
	},
});
