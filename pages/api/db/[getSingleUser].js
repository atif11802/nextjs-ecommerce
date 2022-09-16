import { getSession } from "next-auth/react";
import User from "../../../model/User";

export default async function handler(req, res) {
	const session = await getSession({ req });

	if (!session) return res.status(400).json({ error: "error" });

	const user = await User.findOne({
		_id: session.user._id,
	});

	res.status(200).json({ user });
}
