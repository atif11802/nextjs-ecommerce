import User from "../../../model/User";

export default async function handler(req, res) {
	if (req.method === "PATCH") {
		const { id } = req.headers;

		if (!id) return res.status(400).json({ message: "unauthorized" });

		const admin = await User.findOne({
			_id: id,
		});

		if (!admin || admin.role !== "admin")
			return res.status(400).json({ message: "unauthorized" });

		const { user: userId, role } = JSON.parse(req.body);

		const user = await User.findById(userId);

		let updatedUser;
		if (user) {
			updatedUser = await User.findByIdAndUpdate(
				user._id,
				{
					$set: {
						role: role,
					},
				},
				{
					new: true,
				}
			);
		}

		res.status(200).json(updatedUser);
	}
}
