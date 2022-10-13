import connectDB from "../../../../db";
import Product from "../../../../model/Product";
import { getSession } from "next-auth/react";
import User from "../../../../model/User";

export default async function handler(req, res) {
	const { route } = req.query;

	await connectDB();

	if (route[0] === "getProducts") {
		const products = await Product.find();

		return res.status(200).json(products);
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
				countInStock,
				reviews,
				brand,
				sold,
			} = req.body;

			// console.log(req.user);

			const product = new Product({
				name,
				countInStock,
				price,
				description,
				offer,
				brand,
				// productPicture: urls.map((url) => url.res),
				productPicture: [],
				reviews,
				user: user._id,
				category,
				sold: 0,
			});
			await product.save((err, result) => {
				if (err) {
					return res.status(400).json({ err });
				} else {
					return res.status(200).json(result);
				}
			});
		}
	} else if (route[0] === "updateProduct") {
		if (req.method === "PATCH") {
			const { id } = req.headers;

			if (!id) return res.status(400).json({ message: "unauthorized" });

			const user = await User.findOne({
				_id: id,
			});

			if (!user || user.role !== "admin")
				return res.status(400).json({ message: "unauthorized" });

			const productId = route[1];

			const product = await Product.findOne({ _id: productId });

			if (product) {
				const updatedProduct = await Product.findByIdAndUpdate(
					product._id,
					JSON.parse(req.body),
					{
						new: true,
					}
				);

				return res.status(200).json(updatedProduct);
			} else {
				return res.status(400).json({
					error: "Product not found",
				});
			}
		}
	} else if (route[0] === "deleteProduct") {
		if (req.method === "DELETE") {
			const { id } = req.headers;

			if (!id) return res.status(400).json({ message: "unauthorized" });

			const user = await User.findOne({
				_id: id,
			});

			if (!user || user.role !== "admin")
				return res.status(400).json({ message: "unauthorized" });

			const productId = route[1];

			const product = await Product.findOne({ _id: productId });

			console.log(product);

			if (product) {
				const deleteProduct = await Product.findByIdAndDelete(product._id);

				return res.status(200).json(deleteProduct);
			} else {
				return res.status(400).json({
					error: "Product not found",
				});
			}
		}
	} else if (route[0] === "getSingleProduct") {
		if (req.method === "GET") {
			const productId = route[1];

			const product = await Product.findOne({ _id: productId });

			if (product) {
				const foundProduct = await Product.findById(product._id);

				return res.status(200).json(foundProduct);
			} else {
				return res.status(400).json({
					error: "Product not found",
				});
			}
		}
	} else if (route[0] === "createReviewProduct") {
		if (req.method === "POST") {
			const { id } = req.headers;

			if (!id) return res.status(400).json({ message: "unauthorized" });

			const user = await User.findOne({
				_id: id,
			});

			const product = await Product.findById(route[1]);

			const { rating, comment } = JSON.parse(req.body);

			const review = {
				name: user.name,
				rating: Number(rating),
				comment,
				user: user._id,
			};

			product.reviews.push(review);

			product.numReviews = product.reviews.length;

			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;

			await product.save();
			res.status(201).json({ message: "Review added" });
		}
	} else if (route[0] === "getAllProduct") {
		if (req.method === "GET") {
			const { id } = req.headers;

			if (!id) return res.status(400).json({ message: "unauthorized" });

			const user = await User.findOne({
				_id: id,
			});

			if (!user || user.role !== "admin")
				return res.status(400).json({ message: "unauthorized" });

			const allProducts = await Product.find({});

			res.status(200).json(allProducts);
		}
	}
	// return;
}
