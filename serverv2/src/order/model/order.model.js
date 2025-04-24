import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
	products: [
		{
			name: {
				type: String,
			},
			price: {
				type: Number,
			},
			amount: {
				type: Number,
			},
		},
	],
	email: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
});

export default mongoose.model("Order", OrderSchema);
