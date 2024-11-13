import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneLaptop } from "../../Api/Laptops/LaptopApi";
import { useProductStore } from "../../Api/store/store";
import styles from "./FullProductLaptop.module.scss";

export const FullProductLaptop = () => {
	const addToBasket = useProductStore(state => state.addToBasket);
	const products = useProductStore(state => state.products);
	const [laptop, setLaptop] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	useEffect(() => {
		const fetchLaptop = async () => {
			const data = await getOneLaptop(id);
			setLaptop(data);
		};
		if (id) fetchLaptop();
	}, [id]);

	const handleAddToBasket = () => {
		const _id = laptop._id;
		const picture = laptop.picture;
		const name = laptop.name;
		const price = laptop.price;
		const productType = "laptop";
		addToBasket({ _id, picture, name, price, productType });
	};

	// console.log(laptop);

	if (!laptop) {
		return <p>Loading...</p>;
	}

	return (
		<div className={styles.FullProduct}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Карточка товара</h1>
			</div>
			<div className={styles.contentInfo}>
				<img
					src={`http://localhost:4444/laptops/${laptop.picture}`}
					alt={laptop.name}
				/>
				<div className={styles.info}>
					<h1>{laptop.name}</h1>
					<h3>Характеристики: </h3>
					<p>
						Екран:_________________________________{" "}
						{laptop.characteristics.screen}
					</p>
					<p>
						Кількість ядер:________________________{" "}
						{laptop.characteristics.core.cores}
					</p>
					<p>Процесор:_________ {laptop.characteristics.core.coreName}</p>
					<p>Оперативна пам'ять:___________ {laptop.characteristics.ram}</p>
					<p>Накопичувач даних:____________ {laptop.characteristics.storage}</p>
					<p>Відеокарта:_____________ {laptop.characteristics.video_card}</p>
				</div>
				<div className={styles.toBasket}>
					<div>
						<h1>{formatPrice(laptop.price)}</h1>
						<button onClick={handleAddToBasket}>У кошик</button>
					</div>
				</div>
			</div>
		</div>
	);
};
