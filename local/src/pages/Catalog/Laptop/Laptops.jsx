import { ChevronLeft } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLaptops } from "../../../Api/Laptops/LaptopApi";
import { CatalogSideBar, Product } from "../../../components";
import styles from "./Laptops.module.scss";

export const Laptops = () => {
	const [laptops, setLaptops] = useState([]);
	const [filteredLaptops, setFilteredLaptops] = useState([]);
	const [filters, setFilters] = useState({});
	const navigate = useNavigate();

	const fetchLaptops = useCallback(async () => {
		const data = await getAllLaptops();
		setLaptops(data);
		setFilteredLaptops(data);
	}, []);

	useEffect(() => {
		fetchLaptops();
	}, [fetchLaptops]);

	useEffect(() => {
		const filtered = laptops.filter(laptop => {
			if (
				filters.ram &&
				laptop.characteristics.ram.replace(/\s+/g, "").toLowerCase() !==
					filters.ram.replace(/\s+/g, "").toLowerCase()
			) {
				return false;
			}

			if (
				filters.storage &&
				laptop.characteristics.storage.replace(/\s+/g, "").toLowerCase() !==
					filters.storage.replace(/\s+/g, "").toLowerCase()
			) {
				return false;
			}

			if (filters.brand && laptop.name.split(" ")[0] !== filters.brand) {
				return false;
			}

			if (
				filters.cores &&
				Number(laptop.characteristics.cores) !== Number(filters.cores)
			) {
				return false;
			}

			return true;
		});
		setFilteredLaptops(filtered);
	}, [filters, laptops]);

	const renderLaptops = () => {
		return filteredLaptops.map((laptop, index) => (
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
			<div onClick={() => navigate("/")} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Ноутбуки</h1>
			</div>
			<CatalogSideBar setFilters={setFilters} productType={"laptop"} />
			<div className={styles.product}>{renderLaptops()}</div>
		</div>
	);
};
