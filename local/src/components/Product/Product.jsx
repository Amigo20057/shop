import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../zustand/store/store";

import styles from "./Product.module.scss";

export const Product = ({
	_id,
	picture,
	name,
	price,
	amount,
	product,
	productType,
}) => {
	const addToBasket = useProductStore(state => state.addToBasket);
	const [isFilled, setIsFilled] = useState(false);
	const [pictureSrc, setPictureSrc] = useState();
	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	const navigate = useNavigate();
	const navigateToProduct = id => {
		productType === "laptop"
			? navigate(`/product/laptop/${id}`)
			: productType === "telephone"
			? navigate(`/product/telephone/${id}`)
			: "";
	};

	const addToFavorite = async () => {
		if (isFilled) {
			setIsFilled(false);
		} else {
			setIsFilled(true);
		}
	};

	const handleAddToBasket = () => {
		if (amount <= 0) {
			return;
		}
		addToBasket({ _id, picture, name, price, productType });
	};

	useEffect(() => {
		const src =
			productType === "laptop"
				? `http://localhost:4000/laptop/pictures/${picture}`
				: productType === "telephone"
				? `http://localhost:4000/phone/pictures/${picture}`
				: "";
		setPictureSrc(src);
	}, [productType, picture]);

	return (
		<div className={styles.product}>
			<img
				className={
					productType === "telephone"
						? styles.telephoneImg
						: productType === "laptop"
						? styles.laptopImg
						: ""
				}
				onClick={() => navigateToProduct(_id)}
				src={pictureSrc}
				alt={name}
			/>
			<p className={styles.name}>{name}</p>
			<p className={styles.price}>{formatPrice(price)}</p>
			<div>
				{amount > 0 ? (
					<p>в наявності</p>
				) : (
					<p style={{ color: "red" }}>немає в наявності</p>
				)}
			</div>
			{amount <= 0 ? (
				<button className={styles.notAvailable}>Немає в наявності</button>
			) : (
				<button onClick={() => handleAddToBasket(product)}>У кошик</button>
			)}
		</div>
	);
};
