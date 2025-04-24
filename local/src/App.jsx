import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminHome } from "./admin/pages/AdminHome/AdminHome";
import { Login as AdminLogin } from "./admin/pages/auth/Login/Login";
import { Header } from "./components";
import {
	FullProductLaptop,
	FullProductTelephone,
	Home,
	Laptops,
	Login,
	NotFound,
	Profile,
	Register,
	Telephones,
} from "./pages";

export const App = () => {
	const isAdminRoute = location.pathname.startsWith("/admin");

	return (
		<>
			{!isAdminRoute && <Header />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/telephones' element={<Telephones />} />
				<Route
					path='/product/telephone/:id'
					element={<FullProductTelephone />}
				/>
				<Route path='/product/laptop/:id' element={<FullProductLaptop />} />
				<Route path='/product/laptop' element={<Laptops />} />

				<Route path='/profile' element={<Profile />} />

				<Route path='/auth/login' element={<Login />} />
				<Route path='/auth/register' element={<Register />} />

				<Route path='/admin/login' element={<AdminLogin />} />
				<Route path='/admin/*' element={<AdminHome />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};
