import mongoose from "mongoose";

const BasketSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			amount: { type: Number, default: 1 },
		},
	],
	updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Basket", BasketSchema);
