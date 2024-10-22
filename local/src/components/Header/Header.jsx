import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Basket } from "../Basket/Basket";
import styles from "./Header.module.scss";

export const Header = () => {
	const [isOpenBasket, setIsOpenBasket] = useState(false);
	console.log(isOpenBasket);

	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				<h1>GLANCE</h1>
			</Link>
			<div className={styles.search}>
				<img src="icon_search.png" alt="search" />
				<input type="text" placeholder="Пошук" />
			</div>
			<div className={styles.tabBar}>
				<div className={styles.catalog}>
					<img src="icon_catalog.png" alt="catalog" />
					<p>Каталог</p>
				</div>
				<div
					className={styles.basket}
					onClick={() => setIsOpenBasket(!isOpenBasket)}
				>
					<img src="icon_basket.png" alt="basket" />
					<p>Кошик</p>
				</div>
				<div className={styles.profile}>
					<img src="icon_profile.png" alt="profile" />
					<p>Профіль</p>
				</div>
			</div>
			<div>
				<Basket isOpenBasket={isOpenBasket} />
			</div>
		</div>
	);
};
