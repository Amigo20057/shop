import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProfile = async token => {
	return await axios.get("http://localhost:4000/user/profile", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export function useProfile(token) {
	const { data, isLoading, status } = useQuery({
		queryKey: ["user"],
		queryFn: () => getProfile(token),
		select: data => data.data,
		enabled: !!token,
	});

	return { data, isLoading, status };
}
