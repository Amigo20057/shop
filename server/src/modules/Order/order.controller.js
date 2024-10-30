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

route.get("/", AuthCheck, async (req, res) => {
	try {
		const orders = await orderService.getAll();
		res.status(200).json(orders);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error get all orders" });
	}
});

route.get("/:id", AuthCheck, async (req, res) => {
	try {
		const orderId = req.params.id;
		const order = await orderService.getOne(orderId);
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error get one order" });
	}
});

route.delete("/:id", AuthCheck, async (req, res) => {
	try {
		const orderId = req.params.id;
		await orderService.delete(orderId);
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error delete order" });
	}
});

export const orderRouter = route;
