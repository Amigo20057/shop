import { ChevronLeft } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTelephones } from "../../../Api/Telephones/TelephoneApi";
import { CatalogSideBar } from "../../../components";
import { Product } from "../../../components/Product/Product";
import styles from "./Telephones.module.scss";

export const Telephones = () => {
	const [telephones, setTelephones] = useState([]);
	const [filteredTelephones, setFilteredTelephones] = useState([]);
	const [filters, setFilters] = useState({});
	const navigate = useNavigate();

	const fetchTelephones = useCallback(async () => {
		const data = await getAllTelephones();
		setTelephones(data);
		setFilteredTelephones(data);
	}, []);

	useEffect(() => {
		fetchTelephones();
	}, [fetchTelephones]);

	useEffect(() => {
		const filtered = telephones.filter(telephone => {
			if (
				filters.ram &&
				telephone.characteristics.ram.replace(/\s+/g, "").toLowerCase() !==
					filters.ram.replace(/\s+/g, "").toLowerCase()
			) {
				return false;
			}

			if (
				filters.rom &&
				telephone.characteristics.rom.replace(/\s+/g, "").toLowerCase() !==
					filters.rom.replace(/\s+/g, "").toLowerCase()
			) {
				return false;
			}

			if (filters.brand && telephone.name.split(" ")[0] !== filters.brand) {
				return false;
			}

			if (
				filters.cores &&
				Number(telephone.characteristics.cores) !== Number(filters.cores)
			) {
				return false;
			}

			return true;
		});
		setFilteredTelephones(filtered);
		console.log("Current filters:", filters);
		console.log("All telephones:", telephones);
	}, [filters, telephones]);

	const renderTelephones = () => {
		return filteredTelephones.map((telephone, index) => (
			<Product
				key={index}
				_id={telephone._id}
				picture={telephone.picture}
				name={telephone.name}
				price={telephone.price}
				amount={telephone.amount}
				product={telephone}
				productType={"telephone"}
			/>
		));
	};

	return (
		<div className={styles.Products}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Смартфони</h1>
			</div>
			<CatalogSideBar setFilters={setFilters} productType={"telephone"} />
			<div className={styles.product}>{renderTelephones()}</div>
		</div>
	);
};
