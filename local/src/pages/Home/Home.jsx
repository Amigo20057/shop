import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
	banner,
	musicColumn,
	notebook,
	pc,
	tablet,
	telephone,
	testTelephone,
	tv,
} from "./assets";
import styles from "./Home.module.scss";
const telephonesTest = [
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 3,
	},
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 3,
	},
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 3,
	},
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 3,
	},
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 3,
	},
	{
		path: testTelephone,
		name: "Смартфон Apple iPhone 14",
		price: "52 999грн",
		amount: 0,
	},
];
export const Home = () => {
	const [basket, setBasket] = useState([]);
	const [isFilled, setIsFilled] = useState(false);

	const renderProduct = () => {
		return telephonesTest.map((telephone, index) => (
			<div className={styles.telephone} key={index}>
				<img src={telephone.path} alt={telephone.name} />
				<p className={styles.name}>{telephone.name}</p>
				<p className={styles.price}>{telephone.price}</p>
				<div>
					{telephone.amount > 0 ? (
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
				<button onClick={() => addToBasket(telephone)}>У кошик</button>
			</div>
		));
	};

	const addToBasket = product => {
		const existingProduct = basket.find(item => item.name === product.name);

		if (existingProduct) {
			setBasket(prevBasket =>
				prevBasket.map(item =>
					item.name === product.name
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			setBasket(prevBasket => [...prevBasket, { ...product, quantity: 1 }]);
		}
	};

	const addToFavorite = async () => {
		if (isFilled) {
			setIsFilled(false);
		} else {
			setIsFilled(true);
		}
	};

	console.log(basket);

	return (
		<div className={styles.home}>
			<div className={styles.banner}>
				<div className={styles.info}>
					<h1>Розумна колонка</h1>
					<h2>ЗНИЖКА 30%</h2>
					<h3>при покупці другого товару</h3>
				</div>
				<img src={banner} alt="banner" />
			</div>
			<div className={styles.catalog}>
				<h1>Каталог</h1>
				<div>
					<img src={telephone} alt="telephone" />
					<h2>Смартфони</h2>
				</div>
				<div>
					<img src={notebook} alt="notebook" />
					<h2>Ноутбуки</h2>
				</div>
				<div>
					<img src={pc} alt="computer" />
					<h2>Комп'ютери</h2>
				</div>
				<div>
					<img src={tv} alt="tv" />
					<h2>Телевізори</h2>
				</div>
				<div>
					<img src={tablet} alt="tablet" />
					<h2>Планшети</h2>
				</div>
				<div>
					<img src={musicColumn} alt="music column" />
					<h2>Колонки</h2>
				</div>
			</div>
			<div className={styles.products}>
				<h1>Популярні товари</h1>
				{renderProduct()}
			</div>
		</div>
	);
};
