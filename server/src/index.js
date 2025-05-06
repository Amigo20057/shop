import compression from "compression";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { basketRouter } from "./basket/basket.controller.js";
import { orderRouter } from "./order/order.controller.js";
import { productRouter } from "./product/product.controller.js";
import { userRouter } from "./user/user.controller.js";
import { logger } from "./utils/logger.js";

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(compression());

app.use(
	"/phone/pictures",
	express.static(path.join(__dirname, "product", "phone-pictures"))
);

app.use(
	"/laptop/pictures",
	express.static(path.join(__dirname, "product", "laptop-pictures"))
);

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/basket", basketRouter);
app.use("/orders", orderRouter);

mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => {
		logger.info("DB OK");
	})
	.catch(err => {
		logger.error("DB ERROR", err);
	});

app.listen(port, err => {
	if (err) {
		logger.error("Error: ", err);
	}
	logger.info(`SERVER IS RUNNING ON PORT ${port}`);
});
