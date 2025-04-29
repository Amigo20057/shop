import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = window.localStorage.getItem("token");

const getBasket = async token => {
	return await axios.get("http://localhost:4000/basket", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export function useBasket() {
	const { data, isSuccess, status } = useQuery({
		queryKey: ["profile-basket"],
		queryFn: () => getBasket(token),
		select: data => data.data,
		enabled: !!token,
	});

	return {
		data,
		isSuccess,
		status,
	};
}
