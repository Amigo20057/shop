import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = window.localStorage.getItem("token");

const getOrders = async () => {
	return await axios.get("http://localhost:4000/orders", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export function useOrders() {
	const { data, isSuccess, status } = useQuery({
		queryKey: "orders",
		queryFn: getOrders,
		select: data => data.data,
		enabled: !!token,
	});

	return { data, isSuccess, status };
}
