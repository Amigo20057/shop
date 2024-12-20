import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminHome } from "./admin/pages/AdminHome/AdminHome";
import { Login } from "./admin/pages/auth/Login/Login";
import { Header } from "./components/Header/Header";
import {
	FullProductLaptop,
	FullProductTelephone,
	Home,
	Laptops,
	NotFound,
	Telephones,
} from "./pages";

export const App = () => {
	const isAdminRoute = location.pathname.startsWith("/admin");

	return (
		<>
			{!isAdminRoute && <Header />}
			<Routes>
				{/* Общие маршруты */}
				<Route path='/' element={<Home />} />
				<Route path='/product/telephone' element={<Telephones />} />
				<Route
					path='/product/telephone/:id'
					element={<FullProductTelephone />}
				/>
				<Route path='/product/laptop/:id' element={<FullProductLaptop />} />
				<Route path='/product/laptop' element={<Laptops />} />

				{/* Админ маршруты */}
				<Route path='/admin/login' element={<Login />} />
				<Route path='/admin/*' element={<AdminHome />} />

				{/* Маршрут для несуществующих страниц */}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};
