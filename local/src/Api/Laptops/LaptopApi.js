import axios from "../axios";

export const getAllLaptops = async () => {
	const { data } = await axios.get("/product/laptop");
	return data;
};

export const getOneLaptop = async id => {
	const { data } = await axios.get(`/product/telephone/${id}`);
	return data;
};
