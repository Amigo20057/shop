import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { FullProduct, Home, NotFound, Telephones } from "./pages";

export const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/telephone' element={<Telephones />} />
				<Route path='/product/telephone/:id' element={<FullProduct />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};
