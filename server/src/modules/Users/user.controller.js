import { Router } from "express";
import { AuthCheck } from "../../utils/auth.middleware.js";
import { UserService } from "./user.service.js";

const route = Router();
const userService = new UserService();

route.post("/register", async (req, res) => {
	try {
		const newUser = await userService.register(req.body);
		res.status(200).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

route.post("/login", async (req, res) => {
	try {
		const user = await userService.login(req.body);
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

route.get("/me", AuthCheck, async (req, res) => {
	try {
		const userId = req._id;
		const user = await userService.getMe(userId);
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

export const userRouter = route;
