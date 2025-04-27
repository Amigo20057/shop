import React, { useCallback, useEffect, useState } from "react";
import { getAllLaptops } from "../../../Api/Laptops/LaptopApi";
import { getAllTelephones } from "../../../Api/Telephones/TelephoneApi";
import styles from "./Product.module.scss";

export const Product = ({ productType }) => {
	const [products, setProducts] = useState([]);

	const fetchProducts = useCallback(async () => {
		try {
			if (productType === "laptops") {
				const data = await getAllLaptops();
				setProducts(data);
			}
			if (productType === "telephones") {
				const data = await getAllTelephones();
				setProducts(data);
			}
		} catch (error) {
			console.log(`Помилка отримання ${productType}`);
		}
	}, [productType]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const renderProduct = () => {
		if (!Array.isArray(products) || products.length === 0) {
			return (
				<span style={{ color: "#fff", marginLeft: "50px" }}>
					Завантанження....
				</span>
			);
		}

		return products.map(product => (
			<li key={product._id}>
				<div className={styles.productId}>
					<h4>{product._id}</h4>
				</div>
				<div className={styles.productPicture}>
					<img
						className={
							productType === "telephones"
								? styles.imgTelephones
								: styles.imgLaptops
						}
						src={`http://localhost:4444/${productType}/${product.picture}`}
						alt={productType}
					/>
				</div>
				<div className={styles.productName}>
					<h4>{product.name}</h4>
				</div>
				<div className={styles.productAmount}>
					<h4>{product.amount}</h4>
				</div>
			</li>
		));
	};

	return (
		<div className={styles.product}>
			<div className={styles.container}>
				<h1>
					Усі{" "}
					{productType === "telephones" ? (
						<span>телефони</span>
					) : (
						<span>ноутбуки</span>
					)}
				</h1>
				<div className={styles.names}></div>
				<div className={styles.content}>
					<ul>{renderProduct()}</ul>
				</div>
			</div>
		</div>
	);
};
