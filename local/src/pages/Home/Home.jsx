import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTelephones } from "../../Api/Telephones/TelephoneApi";
import { Product } from "../../components/Product/Product";
import {
	banner,
	musicColumn,
	notebook,
	pc,
	tablet,
	telephone,
	tv,
} from "./assets";
import styles from "./Home.module.scss";

// const telephonesTest = [
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 3,
// 	},
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 3,
// 	},
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 3,
// 	},
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 3,
// 	},
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 3,
// 	},
// 	{
// 		path: testTelephone,
// 		name: "Смартфон Apple iPhone 14",
// 		price: "52 999грн",
// 		amount: 0,
// 	},
// ];

export const Home = () => {
	const [telephones, setTelephones] = useState([]);

	const navigate = useNavigate();
	console.log(telephones);

	useEffect(() => {
		const fetchTelephones = async () => {
			const data = await getAllTelephones();
			setTelephones(data);
		};
		fetchTelephones();
	}, []);

	const renderTelephones = () => {
		return telephones
			.slice(0, 7)
			.map((telephone, index) => (
				<Product
					key={index}
					_id={telephone._id}
					picture={telephone.picture}
					name={telephone.name}
					price={telephone.price}
					amount={telephone.amount}
					product={telephone}
					productType={"telephone"}
				/>
			));
	};

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
				<div onClick={() => navigate("/product/telephone")}>
					<img src={telephone} alt="telephone" />
					<h2>Смартфони</h2>
				</div>
				<div onClick={() => navigate("/product/laptop")}>
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
				<h1>Популярні Смартфони</h1>
				{renderTelephones()}
			</div>
		</div>
	);
};
