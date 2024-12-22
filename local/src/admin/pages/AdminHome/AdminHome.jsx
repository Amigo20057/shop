import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkAuth } from "../../../Api/Auth/AuthApi";
import { SideBar } from "../../components/SideBar/SideBar";

import { Laptop } from "../laptops/Laptop";
import { Order } from "../orders/Order";
import { Telephone } from "../telephones/Telephone";

import { NotFound } from "../../../pages";

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
				{/* Вложенные маршруты */}
				<Route path='/orders' element={<Order />} />
				<Route path='/telephones' element={<Telephone />} />
				<Route path='/laptops' element={<Laptop />} />
				<Route path='/' element={<Navigate to='/admin/orders' />} />
				{/* Обработка несуществующих маршрутов */}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
};
