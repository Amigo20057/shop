import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			amount: { type: Number, required: true },
		},
	],
	email: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	telephoneNumber: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Order", OrderSchema);
