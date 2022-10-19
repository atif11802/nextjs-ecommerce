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
	number:
		typeof window !== "undefined" && localStorage.getItem("number")
			? JSON.parse(localStorage.getItem("number"))
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
		InNumber: (state, action) => {
			state.number = action.payload;

			localStorage.setItem("number", JSON.stringify(action.payload));
		},
	},
});

// Action creators are generated for each case reducer function
export const { InAddress, InPayment, InNumber } = checkoutSlice.actions;

export default checkoutSlice.reducer;
