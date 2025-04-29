import mongoose from "mongoose";
import Product from "./product.model.js";

const phoneSchema = new mongoose.Schema({
	brand: String,
	ram: String,
	rom: String,
	battery: String,
	screen: String,
	cores: Number,
	camera: String,
});

export default Product.discriminator("phone", phoneSchema);
