import mongoose from "mongoose";

const TelephoneSchema = new mongoose.Schema({
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
		cores: {
			type: Number,
			required: true,
		},
		power: {
			type: String,
			required: true,
		},
		ram: {
			type: String,
			required: true,
		},
		rom: {
			type: String,
			required: true,
		},
		camera: {
			type: String,
			required: true,
		},
	},
	picture: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Telephone", TelephoneSchema);
