import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages'

export const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</>
	)
}
