import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
	const { payment } = req.query;

	if (payment[0] === "paymoney") {
		const { cus_email, cus_name, cus_phone, amount, desc, currency } = req.body;

		console.log(cus_email, cus_name, cus_phone, amount, desc, currency);
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
			success_url: "https://nextjs-ecommerce-xi-eight.vercel.app/",
			fail_url: "http://localhost:3900/callback",
			cancel_url: "http://localhost:3900/callback",
			type: "json", //This is must required for JSON request
		};
		const { data } = await axios.post(
			"https://sandbox.aamarpay.com/jsonpost.php",
			formData
		);

		console.log(data);

		return res.status(200).json(data);
		// if (data.result !== "true") {
		// 	let errorMessage = "";
		// 	for (let key in data) {
		// 		errorMessage += data[key] + ". ";
		// 	}
		// 	return res.render("error", {
		// 		title: "Error",
		// 		errorMessage,
		// 	});
		// }

		res.status(301).redirect(data.payment_url);
	}
}

// https://nextjs-ecommerce-xi-eight.vercel.app/
