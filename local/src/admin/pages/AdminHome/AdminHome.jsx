import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useProfile } from "../../../hooks/user/useProfile";
import { Orders } from "../orders/Orders";
import { Telephones } from "../telephones/Telephones";

export const AdminHome = () => {
	const token = window.localStorage.getItem("token");
	const { data, isLoading, status } = useProfile(token);
	const navigate = useNavigate();

	useEffect(() => {
		if (
			window.location.pathname !== "/admin/register" &&
			(!token || status === "error")
		) {
			navigate("/admin/login");
		}
	}, [token, status, data, navigate]);

	if (isLoading) {
		return <div>...loading</div>;
	}

	return (
		<Routes>
			<Route path='orders' element={<Orders />} />
			<Route path='telephones' element={<Telephones />} />
		</Routes>
	);
};
