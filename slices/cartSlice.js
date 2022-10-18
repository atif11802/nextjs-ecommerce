import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// cartItems:window?  [],
	cartItems:
		typeof window !== "undefined"
			? localStorage.getItem("cartItems")
				? JSON.parse(localStorage.getItem("cartItems"))
				: []
			: null,

	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			const existingIndex = state.cartItems.findIndex(
				(item) => item._id === action.payload.product._id
			);

			if (existingIndex >= 0) {
				state.cartItems[existingIndex] = {
					...state.cartItems[existingIndex],
					cartQuantity:
						state.cartItems[existingIndex].cartQuantity + action.payload.qty,
				};
			} else {
				let tempProductItem = {
					...action.payload.product,
					cartQuantity: action.payload.qty,
				};
				state.cartItems.push(tempProductItem);
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart(state, action) {
			console.log(action.payload);
			state.cartItems.map((cartItem) => {
				if (cartItem._id === action.payload._id) {
					const nextCartItems = state.cartItems.filter(
						(item) => item._id !== cartItem._id
					);

					state.cartItems = nextCartItems;
				}
				localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
			});
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
