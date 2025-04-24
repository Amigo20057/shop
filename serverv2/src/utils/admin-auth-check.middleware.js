import "dotenv/config";
import jwt from "jsonwebtoken";
import { profile } from "../user/user.service.js";

export async function AdminAuthCheck(req, res, next) {
	const token = (req.headers.authorization || "").replace(/Bearer\s/, "");
	if (!token) {
		return res.status(401).json({
			message: "Authorization token is required",
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = await profile(decoded._id);
		if (user.role === "ADMIN") {
			req._id = user._id;
			return next();
		}
		return res.status(401).json({
			message: "Role not ADMIN",
		});
	} catch (error) {
		return res.status(401).json({
			message: "Invalid token",
			error: error.message,
		});
	}
}
