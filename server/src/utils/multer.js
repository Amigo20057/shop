import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const telephonesPicturesDir = path.join(
	__dirname,
	"../modules/Telephones/pictures"
);

const storageTelephonesPictures = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, telephonesPicturesDir);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});

export const uploadTelephonesPictures = multer({
	storage: storageTelephonesPictures,
});
