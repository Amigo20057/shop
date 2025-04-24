import { Router } from "express";
import { AdminAuthCheck } from "../utils/admin-auth-check.middleware.js";
import { logger } from "../utils/logger.js";
import {
	uploadLaptopsPictures,
	uploadPhonesPictures,
} from "../utils/multer.js";
import {
	createLaptop,
	createPhone,
	filterPhones,
	findAllProductsByCategory,
	findProductById,
} from "./product.service.js";

const route = Router();

route.post(
	"/create-phone",
	AdminAuthCheck,
	uploadPhonesPictures.single("picture"),
	async (req, res) => {
		try {
			const phoneData = {
				...req.body,
				picture: req.file?.filename,
			};
			const phone = await createPhone(phoneData);
			res.status(201).json(phone);
		} catch (error) {
			logger.error(error);
			res
				.status(500)
				.json({ message: "Error create phone", error: error.message });
		}
	}
);

route.post(
	"/create-laptop",
	AdminAuthCheck,
	uploadLaptopsPictures.single("picture"),
	async (req, res) => {
		try {
			const laptop = await createLaptop(req.body);
			res.status(201).json(laptop);
		} catch (error) {
			logger.error(error);
			res
				.status(500)
				.json({ message: "Error create laptop", error: error.message });
		}
	}
);

route.get("/by-id/:productId", async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await findProductById(productId);
		res.status(200).json(product);
	} catch (error) {
		logger.error(error);
		res
			.status(500)
			.json({ message: "Error get product by id", error: error.message });
	}
});

route.get("/phones", async (req, res) => {
	try {
		const { limit } = req.query;
		const telephones = await findAllProductsByCategory("phone", limit);
		res.status(200).json(telephones);
	} catch (error) {
		logger.error(error);
		res
			.status(500)
			.json({ message: "Error get telephones", error: error.message });
	}
});

route.get("/laptops", async (req, res) => {
	try {
		const laptops = await findAllProductsByCategory("laptop");
		res.status(200).json(laptops);
	} catch (error) {
		logger.error(error);
		res
			.status(500)
			.json({ message: "Error get laptops", error: error.message });
	}
});

route.get("/phones/filters", async (req, res) => {
	try {
		const phones = await filterPhones(req.query);
		res.status(200).json(phones);
	} catch (error) {
		logger.error(error);
		res
			.status(500)
			.json({ message: "Error get telephones", error: error.message });
	}
});

export const productRouter = route;
