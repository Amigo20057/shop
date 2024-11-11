import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { laptopRouter } from "./modules/laptops/laptop.controller.js";
import { orderRouter } from "./modules/order/order.controller.js";
import { telephoneRouter } from "./modules/telephones/telephone.controller.js";
import { userRouter } from "./modules/users/user.controller.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
	"/telephones/pictures",
	express.static(path.join(__dirname, "modules", "telephones", "pictures"))
);

app.use(
	"/laptops/pictures",
	express.static(path.join(__dirname, "modules", "laptops", "pictures"))
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
app.use("/product/laptop", laptopRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.listen(PORT, err => {
	if (err) {
		console.log(err);
	}
	console.log("SERVE OK");
});
