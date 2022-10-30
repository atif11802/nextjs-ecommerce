import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { server } from "../../../config";
import connectDB from "../../../db";
import Order from "../../../model/order";

export default async function handler(req, res) {
	const { payment } = req.query;

	if (payment[0] === "paymoney") {
		await connectDB();
		const {
			cus_email,
			cus_name,
			cus_phone,
			amount,
			desc,
			currency,
			payment,
			address,
			user,
			products,
		} = req.body;

		const product = products.map((product) => {
			return {
				product: product._id,
			};
		});

		//convert array product to string
		const productString = product.toString();

		console.log(productString);

		const formData = {
			cus_name,
			cus_email,
			cus_phone,
			amount,
			tran_id: uuidv4(),
			signature_key: process.env.PAYMONEY_SIGNATURE_KEY,
			store_id: process.env.AMARPAY_STORE,
			currency,
			desc: "dasdasdasdasdasda",
			cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
			cus_add2: "Dhaka",
			cus_city: "Dhaka",
			cus_country: "Bangladesh",
			success_url: `${server}/api/payment/success`,
			fail_url: "http://localhost:3900/callback",
			cancel_url: "http://localhost:3900/callback",
			type: "json", //This is must required for JSON request
			opt_a: productString,
			opt_b: user,
			opt_c: address,
		};
		const { data } = await axios.post(
			"https://sandbox.aamarpay.com/jsonpost.php",
			formData
		);

		// console.log(data);

		// if (createdOrder) {
		// 	return res.status(200).json(data);
		// }
		return res.status(200).json(data);
	}

	if (payment[0] === "success") {
		const { opt_a, opt_b, opt_c, opt_d, amount, opt_e } = req.body;

		console.log(opt_a);
		console.log(JSON.stringify(opt_a));

		// const order = new Order({
		// 	orderItems: opt_a,
		// 	shippingAddress: opt_c,
		// 	paymentMethod: "online payment",
		// 	totalPrice: amount,
		// 	user: opt_b,
		// 	isPaid: true,
		// 	isDelivered: false,
		// });

		// console.log(order);

		// const createdOrder = await order.save();

		// if (createdOrder) {
		// 	res.redirect(`${server}`);
		// }
	}

	if (payment[0] === "getAllOrders") {
		await connectDB();
		const orders = await Order.find({})
			.populate("user", "name email")
			.populate("orderItems.product");
		res.status(200).json(orders);
	}
}

// https://nextjs-ecommerce-xi-eight.vercel.app/
