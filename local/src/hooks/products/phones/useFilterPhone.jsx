import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPhones = async filters => {
	return await axios.get("http://localhost:4000/products/phones/filters/", {
		params: filters,
	});
};

export function useFilterPhone(filters) {
	return useQuery({
		queryKey: ["telephones", filters],
		queryFn: () => getPhones(filters),
		select: data => data.data,
		enabled: !!filters,
	});
}
