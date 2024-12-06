import axios from "../axios";

export const login = async data => {
	const response = await axios.post("/user/login", data);
	return response.data;
};

export const checkAuth = async state => {
	const token = window.localStorage.getItem("token");
	if (!token) return false;
	try {
		const response = await axios.get("user/me");
		return Boolean(response.data);
	} catch (err) {
		return false;
	}
};

export const logout = () => {};
