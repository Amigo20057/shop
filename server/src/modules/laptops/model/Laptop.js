import mongoose from "mongoose";

const LaptopSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	characteristics: {
		screen: {
			type: String,
			required: true,
		},
		core: {
			coreName: {
				type: String,
				required: true,
			},
			cores: {
				type: Number,
				required: true,
			},
		},
		ram: {
			type: String,
			required: true,
		},
		storage: {
			type: String,
			required: true,
		},
		video_card: {
			type: String,
			required: true,
		},
	},
	picture: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Laptop", LaptopSchema);
