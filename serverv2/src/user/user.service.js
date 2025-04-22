import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "./model/user.model.js";

async function hashPassword(password) {
	return await bcryptjs.hash(password, 10);
}

async function validatePassword(password, userExistsPassword) {
	return await bcryptjs.compare(password, userExistsPassword);
}

async function findUserByEmail(email) {
	return await UserModel.findOne({ email: email });
}

async function findUserById(id) {
	return await UserModel.findById(id);
}

export async function register(user) {
	const userExists = await findUserByEmail(user.email);
	if (userExists) {
		throw new Error("User exists");
	}
	user.password = await hashPassword(user.password);
	const doc = new UserModel({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
	});
	const newUser = await doc.save();
	const token = jwt.sign(
		{
			_id: newUser._id,
		},
		process.env.SECRET,
		{
			expiresIn: "15d",
		}
	);
	const { password, ...userData } = newUser._doc;
	return { ...userData, token };
}

export async function login(user) {
	const userExists = await findUserByEmail(user.email);
	if (!userExists) {
		throw new Error("Wrong data");
	}
	const isValidPassword = await validatePassword(
		user.password,
		userExists._doc.password
	);
	if (!isValidPassword) {
		throw new Error("Wrong data");
	}
	const token = jwt.sign(
		{
			_id: userExists._id,
		},
		process.env.SECRET,
		{
			expiresIn: "15d",
		}
	);
	const { password, ...userData } = userExists._doc;
	return {
		...userData,
		token,
	};
}

export async function profile(id) {
	return await findUserById(id);
}
