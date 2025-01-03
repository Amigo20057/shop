import axios from "../axios";

export const createOrder = async data => {};

export const getAllOrders = async () => {
	const { data } = await axios.get("/order");
	return data;
};

export const deleteOrder = async id => {
	await axios.delete(`/order/${id}`);
};

export const acceptOrder = async id => {};
