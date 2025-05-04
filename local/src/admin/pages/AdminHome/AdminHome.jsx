import React from "react";
import { useProfile } from "../../../hooks/user/useProfile";

export const AdminHome = () => {
	const token = window.localStorage.getItem("token");
	const { data, isLoading, status } = useProfile(token);

	if (isLoading) {
		return <div>...loading</div>;
	}

	console.log("admin data: ", data);

	return <div>AdminHome</div>;
};
