import mongoose from "mongoose";
import Basket from "./model/basket.model.js";

async function findBasketByUserId(userId) {
	return await Basket.findOne({ userId });
}

export async function getBasket(userId) {
	let basket = await Basket.findOne({ userId }).populate("items.productId");
	if (!basket) {
		basket = await Basket.create({ userId, items: [] });
	}
	let products = [];

	for (const item of basket.items) {
		const product = item.productId;
		if (product) {
			let tempObject = {
				id: product._id,
				name: product.name,
				picture: product.picture,
				price: product.price,
				amount: item.amount,
			};
			products.push(tempObject);
		}
	}

	return products;
}

export async function syncBasket(userId, items) {
	if (!userId || !Array.isArray(items)) {
		throw new Error("Invalid input data");
	}

	let basket = await Basket.findOne({ userId });
	if (!basket) {
		basket = await Basket.create({ userId, items: [] });
	}

	for (const incomingItem of items) {
		const existingItem = basket.items.find(
			item => item.productId.toString() === incomingItem.productId
		);

		if (existingItem) {
			if (incomingItem.amount > existingItem.amount) {
				existingItem.amount = incomingItem.amount;
			}
		} else {
			basket.items.push({
				productId: new mongoose.Types.ObjectId(incomingItem.productId),
				amount: incomingItem.amount || 1,
			});
		}
	}

	basket.updatedAt = new Date();
	await basket.save();

	return basket;
}

export async function addToBasket(userId, productId, amount = 1) {
	const basket = await findBasketByUserId(userId);
	if (!basket) {
		return await Basket.create({
			userId,
			items: [{ productId, amount }],
		});
	}
	const itemIndex = basket.items.findIndex(
		item => item.productId.toString() === productId
	);
	if (itemIndex > -1) {
		basket.items[itemIndex].amount += amount;
	} else {
		basket.items.push({ productId, amount });
	}
	basket.updatedAt = new Date();
	await basket.save();
	return basket;
}

export async function removeFromBasket(userId, productId) {
	const basket = await findBasketByUserId(userId);
	if (!basket) return null;
	basket.items = basket.items.filter(
		item => item.productId.toString() !== productId
	);
	basket.updatedAt = new Date();
	await basket.save();
	return basket;
}

export async function clearBasket(userId) {
	await Basket.findOneAndUpdate({ userId }, { items: [] });
}

export async function changeAmountProduct(userId, productId, method) {
	const basket = await Basket.findOne({ userId });
	if (!basket) throw new Error("Basket not found");

	const item = basket.items.find(
		item => item.productId.toString() === productId.toString()
	);

	if (!item) throw new Error("Product not found in basket");

	if (method === "inc") {
		item.amount += 1;
	} else if (method === "dec") {
		item.amount -= 1;
		if (item.amount <= 0) {
			basket.items = basket.items.filter(
				i => i.productId.toString() !== productId.toString()
			);
		}
	} else {
		throw new Error("Invalid method parameter: must be 'inc' or 'dec'");
	}

	basket.updatedAt = new Date();
	await basket.save();
	return basket;
}
