import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("MongoDB connected!!");
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectDB;
