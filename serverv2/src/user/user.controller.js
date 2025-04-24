import { Router } from "express";
import { AuthCheck } from "../utils/auth-check.middleware.js";
import { logger } from "../utils/logger.js";
import { login, profile, register } from "./user.service.js";

const route = Router();

route.post("/register", async (req, res) => {
	try {
		const user = await register(req.body);
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error register", error: error.message });
	}
});

route.post("/login", async (req, res) => {
	try {
		const user = await login(req.body);
		res.status(201).json(user);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error login", error: error.message });
	}
});

route.get("/profile", AuthCheck, async (req, res) => {
	try {
		const user = await profile(req._id);
		res.status(200).json(user);
	} catch (error) {
		logger.error(error);
		res
			.status(500)
			.json({ message: "Error get profile", error: error.message });
	}
});

export const userRouter = route;
