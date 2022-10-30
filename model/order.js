import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
		orderItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		shippingAddress: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},

		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
