import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const phonesPicturesDir = path.join(__dirname, "../product/phone-pictures");

const laptopsPicturesDir = path.join(__dirname, "../product/laptop-pictures");

const storagePhonesPictures = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, phonesPicturesDir);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});

const storageLaptopsPictures = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, laptopsPicturesDir);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});

export const uploadPhonesPictures = multer({
	storage: storagePhonesPictures,
});

export const uploadLaptopsPictures = multer({
	storage: storageLaptopsPictures,
});
