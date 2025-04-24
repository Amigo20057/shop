import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["USER", "ADMIN"],
		default: "USER",
	},
});

export default mongoose.model("User", UserSchema);
