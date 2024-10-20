import axios from "../axios";

export const getAllTelephones = async () => {
	const { data } = await axios.get("/product/telephone");
	return data;
};

export const createTelephone = async params => {};

export const updateAmount = async params => {};
