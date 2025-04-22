import "dotenv/config";
import jwt from "jsonwebtoken";

export async function AuthCheck(req, res, next) {
	const token = (req.headers.authorization || "").replace(/Bearer\s/, "");
	if (!token) {
		return res.status(401).json({
			message: "Authorization token is required",
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req._id = decoded._id;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Invalid token",
			error: error.message,
		});
	}
}
