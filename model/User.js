import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	email: String,
	name: String,
	location: String,
	role: {
		required: true,
		type: String,
		enum: ["admin", "buyer"],
		default: "buyer",
	},
	image: String,
	TotalBuy: Number,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
