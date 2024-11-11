import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLaptops } from "../../../Api/Laptops/LaptopApi";
import { Product } from "../../../components";
import styles from "./Laptops.module.scss";

export const Laptops = () => {
	const [laptops, setLaptops] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllLaptops();
			setLaptops(data);
		};
		fetchData();
	}, []);

	const renderLaptops = () => {
		return laptops.map((laptop, index) => (
			<Product
				key={index}
				_id={laptop._id}
				picture={laptop.picture}
				name={laptop.name}
				price={laptop.price}
				amount={laptop.amount}
				product={laptop}
				productType={"laptop"}
			/>
		));
	};

	return (
		<div className={styles.Products}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Ноутбуки</h1>
			</div>
			{/* <CatalogSideBar setFilters={setFilters}, productType={laptop} /> */}
			<div className={styles.product}>{renderLaptops()}</div>
		</div>
	);
};
