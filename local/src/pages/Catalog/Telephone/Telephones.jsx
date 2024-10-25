import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTelephones } from "../../../Api/Telephones/TelephoneApi";
import { CatalogSideBar } from "../../../components";
import { Product } from "../../../components/Product/Product";
import styles from "./Telephones.module.scss";

export const Telephones = () => {
	const [telephones, setTelephones] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTelephones = async () => {
			const data = await getAllTelephones();
			setTelephones(data);
		};
		fetchTelephones();
	}, []);

	const renderTelephones = () => {
		return telephones.map((telephone, index) => (
			<Product
				key={index}
				_id={telephone._id}
				picture={telephone.picture}
				name={telephone.name}
				price={telephone.price}
				amount={telephone.amount}
				product={telephone}
			/>
		));
	};

	return (
		<div className={styles.Products}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Смартфони</h1>
			</div>
			<CatalogSideBar />
			<div className={styles.product}>{renderTelephones()}</div>
		</div>
	);
};
