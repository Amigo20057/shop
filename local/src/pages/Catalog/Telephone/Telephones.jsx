import React, { useEffect, useState } from "react";
import { getAllTelephones } from "../../../Api/Telephones/TelephoneApi";
import { Product } from "../../../components/Product/Product";
import styles from "./Telephones.module.scss";

export const Telephones = () => {
	const [telephones, setTelephones] = useState([]);

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
			<h1>Смартфони</h1>
			<div className={styles.product}>{renderTelephones()}</div>
		</div>
	);
};
