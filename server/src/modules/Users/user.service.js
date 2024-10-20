import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./model/User.js";

export class UserService {
	async hashPassword(password) {
		return await bcrypt.hash(password, 10);
	}

	async findUserByEmail(email) {
		return await UserModel.findOne({ email: email });
	}

	async register(dto) {
		try {
			const existUser = await this.findUserByEmail(dto.email);
			if (existUser) {
				throw new Error("User exist");
			}

			const hashedPassword = await this.hashPassword(dto.password);
			const doc = new UserModel({
				name: dto.name,
				email: dto.email,
				password: hashedPassword,
			});

			const user = await doc.save();

			const token = jwt.sign(
				{
					_id: user._id,
				},
				process.env.SECRET,
				{
					expiresIn: "30d",
				}
			);

			const { password, ...userData } = user._doc;

			return { ...userData, token };
		} catch (error) {
			throw new Error("Error create user: " + error.message);
		}
	}

	async login(dto) {
		try {
			const user = await this.findUserByEmail(dto.email);

			if (!user) {
				throw new Error("User does not exist");
			}

			const isValidPss = await bcrypt.compare(dto.password, user._doc.password);

			if (!isValidPss) {
				throw new Error("Invalid password");
			}

			const token = jwt.sign(
				{
					_id: user._id,
				},
				"secret123",
				{
					expiresIn: "30d",
				}
			);

			const { password, ...userData } = user._doc;

			return {
				...userData,
				token,
			};
		} catch (err) {
			console.log(err);
			throw new Error("Error logging in: " + err.message);
		}
	}

	async getMe(userId) {
		try {
			const user = await UserModel.findById(userId);

			const token = jwt.sign(
				{
					_id: user._id,
				},
				"secret123",
				{
					expiresIn: "30d",
				}
			);

			return { ...user._doc, token };
		} catch (err) {
			console.log(err);
			throw new Error("Error get user data: " + err.message);
		}
	}
}
