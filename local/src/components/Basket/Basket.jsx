import React from "react";
import { useProductStore } from "../../Api/store/store";
import styles from "./Basket.module.scss";

export const Basket = ({ isOpenBasket }) => {
	const products = useProductStore(state => state.products);

	if (!products) {
		return <p>Кошик пустий...</p>;
	}

	const renderProducts = () => {
		return products.map((product, index) => (
			<div className={styles.product} key={index}>
				<div className={styles.img}>
					<img
						src={`http://localhost:4444/telephones/${product.picture}`}
						alt={product.name}
					/>
				</div>
				<div className={styles.productName}>
					<h3>{product.name}</h3>
				</div>
				<div className={styles.productPrice}>
					<h3>{product.price}</h3>
				</div>
			</div>
		));
	};

	return (
		<div className={isOpenBasket ? styles.Basket : styles.closeBasket}>
			<h1>Кошик</h1>
			{renderProducts()}
		</div>
	);
};
