import { Router } from "express";
import { AdminAuthCheck } from "../utils/admin-auth-check.middleware.js";
import { AuthCheck } from "../utils/auth-check.middleware.js";
import { logger } from "../utils/logger.js";
import {
	completeOrder,
	createOrder,
	getOrders,
	getOrdersForAdmin,
} from "./order.service.js";

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

route.get("/admin-orders", AdminAuthCheck, async (req, res) => {
	try {
		const orders = await getOrdersForAdmin(req._id);
		res.status(200).json(orders);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error get orders",
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

route.patch(`/:orderId`, AdminAuthCheck, async (req, res) => {
	try {
		const { status } = req.body;
		await completeOrder(req.params.orderId, status);
		res.status(200).json({ success: true });
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error update order",
			error: error.message,
		});
	}
});

export const orderRouter = route;
