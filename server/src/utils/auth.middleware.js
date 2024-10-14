import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

export const AuthCheck = async (req, res, next) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s/, "");
	if (!token) {
		return res.status(401).json({ message: "Authorization token is required" });
	}

	try {
		const decoded = jwt.verify(token, SECRET);
		req._id = decoded._id;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token", err });
	}
};
