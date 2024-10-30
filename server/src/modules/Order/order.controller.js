import { Router } from "express";
import { AuthCheck } from "../../utils/auth.middleware.js";
import { OrderService } from "./order.service.js";

const route = Router();
const orderService = new OrderService();

route.post("/buy", AuthCheck, async (req, res) => {
	try {
		const { products, email } = req.body;
		const order = await orderService.createOrder(products, email);
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error processing purchase" });
	}
});

export const orderRouter = route;
