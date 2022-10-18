import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address:
		typeof window !== "undefined" && localStorage.getItem("address")
			? JSON.parse(localStorage.getItem("address"))
			: "",
	payment:
		typeof window !== "undefined" && localStorage.getItem("payment")
			? JSON.parse(localStorage.getItem("payment"))
			: "",
};

export const checkoutSlice = createSlice({
	name: "Checkout",
	initialState,
	reducers: {
		InAddress: (state, action) => {
			state.address = action.payload;

			localStorage.setItem("address", JSON.stringify(action.payload));
		},
		InPayment: (state, action) => {
			state.payment = action.payload;

			localStorage.setItem("payment", JSON.stringify(action.payload));
		},
	},
});

// Action creators are generated for each case reducer function
export const { InAddress, InPayment } = checkoutSlice.actions;

export default checkoutSlice.reducer;
