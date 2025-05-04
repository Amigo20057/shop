import { Router } from "express";
import { AuthCheck } from "../utils/auth-check.middleware.js";
import { logger } from "../utils/logger.js";
import { createOrder, getOrders } from "./order.service.js";

const route = Router();

route.post("/", AuthCheck, async (req, res) => {
	try {
		const order = await createOrder(req._id, req.body);
		res.status(201).json(order);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error create order",
			error: error.message,
		});
	}
});

route.get("/", AuthCheck, async (req, res) => {
	try {
		const orders = await getOrders(req._id);
		res.status(200).json(orders);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error get orders",
			error: error.message,
		});
	}
});

export const orderRouter = route;
