import React from "react";
import { useProductStore } from "../../Api/store/store";
import styles from "./Basket.module.scss";

export const Basket = ({ isOpenBasket }) => {
	const products = useProductStore(state => state.products);
	const decreaseCountBasket = useProductStore(state => state.decreaseCount);

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	const handleRemoveFromBasket = id => {
		decreaseCountBasket(id);
	};

	const renderProducts = () => {
		return products.map(product => (
			<div
				className={styles.product}
				key={product._id}
				onClick={() => handleRemoveFromBasket(product._id)}
			>
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
					<h3>{formatPrice(product.price)}</h3>
					<h3>Кількість: {product.count}</h3>
				</div>
			</div>
		));
	};

	return (
		<div className={isOpenBasket ? styles.Basket : styles.closeBasket}>
			<h1>Кошик</h1>
			{products.length === 0 && (
				<p className={styles.voidBasket}>Кошик пустий...</p>
			)}
			{renderProducts()}
		</div>
	);
};
