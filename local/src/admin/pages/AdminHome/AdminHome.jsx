import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkAuth } from "../../../Api/Auth/AuthApi";
import { SideBar } from "../../components/SideBar/SideBar";

import { Order } from "../orders/Order";

import { NotFound } from "../../../pages";

import { Product } from "../product/Product";
import styles from "./adminHome.module.scss";

export const AdminHome = () => {
	const [isAuth, setIsAuth] = useState(null);
	const [activeBtnOptions, setActiveBtnOptions] = useState(1);

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const authStatus = await checkAuth();
				setIsAuth(authStatus);
			} catch (error) {
				console.error("Ошибка проверки авторизации", error);
				setIsAuth(false);
			}
		};
		fetchAuth();
	}, []);

	if (isAuth === null) {
		return <div>Проверка авторизации...</div>;
	}

	if (!isAuth) {
		return <Navigate to='/admin/login' />;
	}

	return (
		<div className={styles.adminHome}>
			<SideBar
				activeBtnOptions={activeBtnOptions}
				setActiveBtnOptions={setActiveBtnOptions}
			/>
			<Routes>
				<Route path='/orders' element={<Order />} />
				<Route
					path='/telephones'
					element={<Product productType={"telephones"} />}
				/>
				<Route path='/laptops' element={<Product productType={"laptops"} />} />
				<Route path='/' element={<Navigate to='/admin/orders' />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
};
