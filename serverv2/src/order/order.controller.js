import { Router } from "express";
import { logger } from "../utils/logger.js";
import { createOrder } from "./order.service.js";

const route = Router();

route.post("/", async (req, res) => {
	try {
		const order = await createOrder(req.body);
		res.status(201).json(order);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error create order",
			error: error.message,
		});
	}
});

export const orderRouter = route;
