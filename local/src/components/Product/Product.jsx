import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../Api/store/store";

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
		navigate(`/product/telephone/${id}`);
	};

	const addToFavorite = async () => {
		if (isFilled) {
			setIsFilled(false);
		} else {
			setIsFilled(true);
		}
	};

	console.log(productType);

	const handleAddToBasket = () => {
		if (amount <= 0) {
			return;
		}
		addToBasket({ _id, picture, name, price });
	};

	useEffect(() => {
		const src =
			productType === "laptop"
				? `http://localhost:4444/laptops/${picture}`
				: productType === "telephone"
				? `http://localhost:4444/telephones/${picture}`
				: "";
		setPictureSrc(src);
	}, [productType, picture]);

	// const productPictureSrc = () => {
	// 	if (productType === "laptop")
	// 		setPictureSrc(`http://localhost:4444/laptops/${picture}`);
	// 	if (productType === "telephone")
	// 		setPictureSrc(`http://localhost:4444/telephones/${picture}`);
	// };

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
				// width={169}
				// height={216}
				onClick={() => navigateToProduct(_id)}
				// src={`http://localhost:4444/laptops/${picture}`}
				// src={`http://localhost:4444/telephones/${picture}`}
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
				<div className={styles.like} onClick={addToFavorite}>
					{isFilled ? (
						<AiFillHeart className={styles.svg} size={24} color="red" />
					) : (
						<AiOutlineHeart className={styles.svg} size={24} color="red" />
					)}
				</div>
			</div>
			<button onClick={() => handleAddToBasket(product)}>У кошик</button>
		</div>
	);
};
