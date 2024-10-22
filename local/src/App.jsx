import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { FullProduct, Home } from "./pages";

export const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/telephone/:id" element={<FullProduct />} />
			</Routes>
		</>
	);
};
