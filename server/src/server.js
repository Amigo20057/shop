import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { telephoneRouter } from "./modules/Telephones/telephone.controller.js";
import { userRouter } from "./modules/Users/user.controller.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

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

app.listen(PORT, err => {
	if (err) {
		console.log(err);
	}
	console.log("SERVE OK");
});
