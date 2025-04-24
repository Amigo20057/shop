import Basket from "./model/basket.model.js";

async function findBasketByUserId(userId) {
	return await Basket.findOne({ userId });
}

export async function getBasket(userId) {
	let basket = await findBasketByUserId(userId);
	if (!basket) {
		basket = await Basket.create({ userId, items: [] });
	}
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
