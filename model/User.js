import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	email: { type: String },
	name: { type: String },
	location: { type: String },
	role: { type: String },
	emailVerified: { type: String },
	image: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
		