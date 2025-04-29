import Product from "../product/model/product.model.js";
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
		return order;
	} catch (err) {
		throw new Error(`Не удалось создать заказ: ${err.message}`);
	}
}
