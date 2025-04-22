import mongoose from "mongoose";
import Product from "./product.model.js";

const laptopSchema = new mongoose.Schema({
	brand: String,
	cpu: String,
	ram: String,
	storage: String,
	screenSize: String,
});

export default Product.discriminator("laptop", laptopSchema);
