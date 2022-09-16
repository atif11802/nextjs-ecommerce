import connectDB from "../../../../db";
import Product from "../../../../model/Product";
import { getSession } from "next-auth/react";
import User from "../../../../model/User";

export default async function handler(req, res) {
	const { route } = req.query;

	await connectDB();

	if (route[0] === "getProducts") {
		const products = await Product.find();

		return res.status(200).json({
			products,
		});
	} else if (route[0] === "postProduct") {
		if (req.method === "POST") {
			const { id } = req.headers;

			if (!id) return res.status(400).json({ message: "unauthorized" });

			const user = await User.findOne({
				_id: id,
			});

			if (!user || user.role !== "admin")
				return res.status(400).json({ message: "unauthorized" });

			const {
				name,
				category,
				price,
				description,
				offer,
				quantity,
				reviews,
				brand,
			} = req.body;

			// console.log(req.user);

			const product = new Product({
				name,

				quantity,
				price,
				description,
				offer,
				brand,
				// productPicture: urls.map((url) => url.res),
				productPicture: [],
				reviews,
				user: user._id,
				category,
			});
			await product.save((err, result) => {
				if (err) {
					return res.status(400).json({ err });
				} else {
					return res.status(400).json(result);
				}
			});
		}
	} else if (route[0] === "updateProduct") {
		if (req.method === "PATCH") {
			const productId = route[1];

			const product = await Product.findOne({ _id: productId });

			if (product) {
				const updatedProduct = await Product.findByIdAndUpdate(
					product._id,
					req.body,
					{
						new: true,
					}
				);
				console.log(updatedProduct);
				return res.status(200).json({
					product: updatedProduct,
				});
			} else {
				return res.status(400).json({
					error: "Product not found",
				});
			}
		}
	}
	// return;
}
