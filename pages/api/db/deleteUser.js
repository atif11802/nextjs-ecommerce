import User from "../../../model/User";

export default async function handler(req, res) {
	const { id: adminId } = req.headers;

	console.log("admin", adminId);

	const admin = await User.findOne({
		_id: adminId,
	});

	if (admin.role === "admin") {
		//user id of delete
		const { id } = JSON.parse(req.body);

		const user = await User.findOne({
			_id: id,
		});

		if (user) {
			const deleteUser = await User.findByIdAndDelete(id);
			res.status(200).json(deleteUser);
		}
	}
}
