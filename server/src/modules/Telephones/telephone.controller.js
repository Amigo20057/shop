import { Router } from "express";
import { AuthCheck } from "../../utils/auth.middleware.js";
import { uploadTelephonesPictures } from "../../utils/multer.js";
import { TelephoneService } from "./telephone.service.js";

const route = Router();
const telephoneService = new TelephoneService();

route.get("/", async (req, res) => {
	try {
		const telephones = await telephoneService.findAll();
		res.status(200).json(telephones);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error get all telephones" });
	}
});

route.post(
	"/create",
	AuthCheck,
	uploadTelephonesPictures.single("picture"),
	async (req, res) => {
		try {
			if (!res.file) {
				return res.status(400).json({ message: "No file uploaded" });
			}

			pictureUrl = `./pictures/${req.file.filename}`;
			const telephone = await telephoneService.createItem(req.body, pictureUrl);
			res.status(200).json(telephone);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error create telephone" });
		}
	}
);

route.patch("/update-amount", AuthCheck, async (req, res) => {
	try {
		const newAmountTelephones = await telephoneService.updateAmount(req.body);
		res.status(200).json(newAmountTelephones);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error update amount" });
	}
});

export const telephoneRouter = route;
