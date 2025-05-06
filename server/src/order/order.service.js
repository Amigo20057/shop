import mongoose from "mongoose";
import { clearBasket } from "../basket/basket.service.js";
import Product from "../product/model/product.model.js";
import { findUserById } from "../user/user.service.js";
import Order from "./model/order.model.js";

export async function createOrder(userId, orderData) {
	if (!userId || !Array.isArray(orderData.items)) {
		throw new Error("Wrong data");
	}

	const order = new Order({
		userId,
		items: orderData.items,
		email: orderData.email,
		fullName: orderData.fullName,
		address: orderData.address,
		telephoneNumber: orderData.telephoneNumber,
		totalPrice: orderData.totalPrice,
	});

	for (const item of orderData.items) {
		if (!mongoose.Types.ObjectId.isValid(item.productId)) {
			throw new Error(`Неверный ID продукта: ${item.productId}`);
		}

		if (item.amount <= 0) {
			throw new Error(
				`Неверное количество товара для продукта: ${item.productId}`
			);
		}

		const product = await Product.findById(item.productId);

		if (!product) {
			throw new Error(`Продукт с ID ${item.productId} не найден`);
		}

		if (product.quantity < item.amount) {
			throw new Error(
				`Недостаточно товара для продукта с ID ${item.productId}`
			);
		}

		product.quantity -= item.amount;
		await product.save();
	}

	try {
		await order.save();
		clearBasket(userId);
		return order;
	} catch (err) {
		throw new Error(`Не удалось создать заказ: ${err.message}`);
	}
}

export async function getOrders(userId) {
	const orders = await Order.find({
		userId: new mongoose.Types.ObjectId(userId),
	}).populate("items.productId");

	const result = orders.map(order => ({
		id: order._id,
		email: order.email,
		fullName: order.fullName,
		address: order.address,
		telephoneNumber: order.telephoneNumber,
		totalPrice: order.totalPrice,
		createdAt: order.createdAt,
		status: order.status,
		items: order.items.map(item => {
			const product = item.productId;
			return {
				id: product._id,
				name: product.name,
				picture: product.picture,
				price: product.price,
				amount: item.amount,
			};
		}),
	}));

	return result;
}

export async function getOrdersForAdmin(userId) {
	const user = await findUserById(userId);
	if (user.role !== "ADMIN") {
		throw new Error("User not admin");
	}

	const orders = await Order.find({ status: "PENDING" }).populate(
		"items.productId"
	);

	const result = orders.map(order => ({
		id: order._id,
		email: order.email,
		fullName: order.fullName,
		address: order.address,
		telephoneNumber: order.telephoneNumber,
		totalPrice: order.totalPrice,
		createdAt: order.createdAt,
		status: order.status,
		items: order.items.map(item => {
			const product = item.productId;
			return {
				id: product._id,
				name: product.name,
				picture: product.picture,
				price: product.price,
				amount: item.amount,
			};
		}),
	}));

	return result;
}

export async function completeOrder(orderId, newStatus) {
	const allowedStatuses = ["PENDING", "PROCESSED", "REJECTION"];
	if (!allowedStatuses.includes(newStatus)) {
		throw new Error("Invalid status");
	}

	await Order.findByIdAndUpdate(orderId, { status: newStatus });
}
