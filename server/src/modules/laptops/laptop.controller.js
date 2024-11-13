import { Router } from "express";
import { AuthCheck } from "../../utils/auth.middleware.js";
import { uploadLaptopsPictures } from "../../utils/multer.js";
import { LaptopService } from "./laptop.service.js";

const route = Router();
const laptopService = new LaptopService();

route.get("/", async (req, res) => {
	try {
		const laptops = await laptopService.getAll();
		res.status(200).json(laptops);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Error fetching all laptops",
		});
	}
});

route.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const laptop = await laptopService.getOne(id);
		res.status(200).json(laptop);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Error fetching one laptop",
		});
	}
});

route.post(
	"/create",
	AuthCheck,
	uploadLaptopsPictures.single("picture"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "No file uploaded" });
			}

			const pictureUrl = `./pictures/${req.file.filename}`;
			const laptop = await laptopService.createItem(req.body, pictureUrl);
			res.status(200).json(laptop);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error create laptop" });
		}
	}
);

route.patch("/update-amount", AuthCheck, async (req, res) => {});
route.delete("/:id", AuthCheck, async (req, res) => {});

export const laptopRouter = route;
