import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPhones = async limit => {
	const url = limit
		? `http://localhost:4000/products/phones?limit=${limit}`
		: `http://localhost:4000/products/phones`;

	return await axios.get(url);
};

export function usePhones(limit = null, isQuery = true) {
	return useQuery({
		queryKey: ["telephones", limit],
		queryFn: () => getPhones(limit),
		select: data => data.data,
		enabled: isQuery,
	});
}
