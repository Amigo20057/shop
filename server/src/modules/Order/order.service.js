import { TelephoneService } from "../Telephones/telephone.service.js";
import OrderModel from "./model/Order.js";

const telephoneService = new TelephoneService();

export class OrderService {
	async createOrder(products, email) {
		try {
			let totalPrice = 0;
			for (const product of products) {
				if (!product.name || product.amount <= 0 || !product.price) {
					throw new Error("Invalid product in order");
				}
				await telephoneService.updateAmount(product.name, -product.amount);
				totalPrice += product.price * product.amount;
			}

			const doc = new OrderModel({
				products: products,
				email: email,
				totalPrice: totalPrice,
			});

			const result = await doc.save();
			return result;
		} catch (err) {
			console.log(err);
			throw new Error("Error creating order: " + err.message);
		}
	}
}
