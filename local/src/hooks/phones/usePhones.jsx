import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPhones = async () => {
	return await axios.get("http://localhost:4000/products/phones");
};

export function usePhones() {
	const { data, isLoading } = useQuery({
		queryKey: ["telephones"],
		queryFn: getPhones,
		select: data => data.data,
	});

	return { data, isLoading };
}
