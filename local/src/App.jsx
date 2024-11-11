import React from "react";
import { Route, Routes } from "react-router-dom";
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
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/telephone" element={<Telephones />} />
				<Route
					path="/product/telephone/:id"
					element={<FullProductTelephone />}
				/>
				<Route path="/product/laptop/:id" element={<FullProductLaptop />} />
				<Route path="/product/laptop" element={<Laptops />} />
				{/* <Route path='/product/laptop/:id' */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};
