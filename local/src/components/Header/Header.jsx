import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Basket } from "../../ui/modals/Basket/Basket";
import styles from "./Header.module.scss";
import { icon_basket, icon_profile, icon_search } from "./assets";

export const Header = () => {
	const [isOpenBasket, setIsOpenBasket] = useState(false);
	const [isSearch, setIsSearch] = useState(true);
	console.log(isOpenBasket);

	return (
		<div className={styles.header}>
			<Link to='/' className={styles.logo}>
				<h1>GLANCE</h1>
			</Link>
			<div className={styles.search}>
				<img src={icon_search} alt='search' />
				<input type='text' placeholder='Пошук' />
			</div>
			{/* {isSearch && <div className={styles.searchProduct}>{12323}</div>} */}
			<div className={styles.tabBar}>
				{/* <div className={styles.catalog}>
					<img src="icon_catalog.png" alt="catalog" />
					<p>Каталог</p>
				</div> */}
				<div
					className={styles.basket}
					onClick={() => setIsOpenBasket(!isOpenBasket)}
				>
					<img src={icon_basket} alt='basket' />
					<p>Кошик</p>
				</div>
				<div
					className={styles.profile}
					onClick={() => (window.location.href = "/profile")}
				>
					<img src={icon_profile} alt='profile' />
					<p>Профіль</p>
				</div>
			</div>
			<div>
				<Basket isOpenBasket={isOpenBasket} setIsOpenBasket={setIsOpenBasket} />
			</div>
		</div>
	);
};
