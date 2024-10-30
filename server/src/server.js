import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { orderRouter } from "./modules/Order/order.controller.js";
import { telephoneRouter } from "./modules/Telephones/telephone.controller.js";
import { userRouter } from "./modules/Users/user.controller.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
	"/telephones/pictures",
	express.static(path.join(__dirname, "modules", "Telephones", "pictures"))
);

mongoose
	.connect(process.env.DATABASE)
	.then(() => {
		console.log("DB OK");
	})
	.catch(err => {
		console.log("DB ERROR", err);
	});

app.use("/product/telephone", telephoneRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.listen(PORT, err => {
	if (err) {
		console.log(err);
	}
	console.log("SERVE OK");
});
