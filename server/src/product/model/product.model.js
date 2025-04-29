import mongoose from "mongoose";

const baseOptions = {
	discriminatorKey: "type",
	collection: "products",
};

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		amount: { type: Number, default: 1 },
		description: String,
		picture: { type: String, required: true },
	},
	baseOptions
);

export default mongoose.model("Product", productSchema);
