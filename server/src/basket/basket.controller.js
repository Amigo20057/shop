import { Router } from "express";
import mongoose from "mongoose";
import { AuthCheck } from "../utils/auth-check.middleware.js";
import { logger } from "../utils/logger.js";
import {
	addToBasket,
	changeAmountProduct,
	getBasket,
	removeFromBasket,
	syncBasket,
} from "./basket.service.js";

const route = Router();

route.get("/", AuthCheck, async (req, res) => {
	try {
		const basket = await getBasket(req._id);
		res.status(200).json(basket);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error get basket",
			error: error.message,
		});
	}
});

route.post("/", AuthCheck, async (req, res) => {
	try {
		const { productId, amount } = req.body;
		const basket = await addToBasket(req._id, productId, amount);
		res.status(200).json(basket);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error add to basket",
			error: error.message,
		});
	}
});

route.post("/sync-basket", AuthCheck, async (req, res) => {
	try {
		const userId = req._id;
		await syncBasket(userId, req.body.items);
		res.status(200).json({ success: true });
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error add to basket",
			error: error.message,
		});
	}
});

route.delete("/:productId", AuthCheck, async (req, res) => {
	try {
		const basket = await removeFromBasket(req._id, req.params.productId);
		res.status(200).json(basket);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: "Error remove from basket",
			error: error.message,
		});
	}
});

route.patch("/:productId", AuthCheck, async (req, res) => {
	try {
		const productId = new mongoose.Types.ObjectId(req.params.productId);
		const userId = req._id;
		const method = req.query.method;
		await changeAmountProduct(userId, productId, method);

		res.status(200).json({ success: true });
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: `Error while changing product amount in basket (method: ${req.query.method})`,
			error: error.message,
		});
	}
});
export const basketRouter = route;
