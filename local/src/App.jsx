import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminHome } from "./admin/pages/adminHome/AdminHome";
import { Login as AdminLogin } from "./admin/pages/auth/Login";
import { Register as AdminRegister } from "./admin/pages/auth/Register";
import { Header } from "./components";
import {
	FullProductTelephone,
	Home,
	Login,
	NotFound,
	Profile,
	Register,
	Telephones,
} from "./pages";
import { Order } from "./pages/order/Order";
import { ProfileBasket } from "./pages/profile/ProfileBasket";
import { ProfileOrders } from "./pages/profile/ProfileOrders";

export const App = () => {
	const isAdminRoute = location.pathname.startsWith("/admin");
	const isHideHeader = ["/auth/login", "/auth/register"].includes(
		location.pathname
	);

	return (
		<>
			{!isAdminRoute && !isHideHeader && <Header />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/telephones' element={<Telephones />} />
				<Route
					path='/product/telephone/:id'
					element={<FullProductTelephone />}
				/>

				<Route path='/create-order' element={<Order />} />

				<Route path='/profile' element={<Profile />}>
					<Route path='orders' element={<ProfileOrders />} />
					<Route path='basket' element={<ProfileBasket />} />
				</Route>

				<Route path='/auth/login' element={<Login />} />
				<Route path='/auth/register' element={<Register />} />

				<Route path='/admin/login' element={<AdminLogin />} />
				<Route path='/admin/register' element={<AdminRegister />} />
				<Route path='/admin/*' element={<AdminHome />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};
