import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProduct = async productId => {
	return await axios.get(`http://localhost:4000/products/by-id/${productId}`);
};

export function useProduct(productId) {
	const { data, isLoading } = useQuery({
		queryKey: ["product"],
		queryFn: () => getProduct(productId),
		select: data => data.data[0],
	});

	return { data, isLoading };
}
