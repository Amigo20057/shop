import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../Api/store/store";
import { getOneTelephones } from "../../Api/Telephones/TelephoneApi";
import styles from "./FullProductTelephone.module.scss";

export const FullProductTelephone = () => {
	const addToBasket = useProductStore(state => state.addToBasket);
	const products = useProductStore(state => state.products);
	const [telephone, setTelephone] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	useEffect(() => {
		const fetchTelephone = async () => {
			const data = await getOneTelephones(id);
			setTelephone(data);
		};
		if (id) fetchTelephone();
	}, [id]);

	const handleAddToBasket = () => {
		const _id = telephone._id;
		const picture = telephone.picture;
		const name = telephone.name;
		const price = telephone.price;
		const productType = "telephone";
		addToBasket({ _id, picture, name, price, productType });
	};

	console.log(telephone);

	if (!telephone) {
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
					src={`http://localhost:4444/telephones/${telephone.picture}`}
					alt={telephone.name}
				/>
				<div className={styles.info}>
					<h1>{telephone.name}</h1>
					<h3>Характеристики: </h3>
					<p>
						Екран:_________________________________{" "}
						{telephone.characteristics.screen}
					</p>
					<p>
						Кількість ядер:________________________{" "}
						{telephone.characteristics.cores}
					</p>
					<p>
						Потужність блоку живлення:_________{" "}
						{telephone.characteristics.power}
					</p>
					<p>
						Оперативна пам'ять (RAM):___________ {telephone.characteristics.ram}
					</p>
					<p>
						Вбудована пам'ять (ROM):____________ {telephone.characteristics.rom}
					</p>
					<p>
						Основная камера МПикс:_____________{" "}
						{telephone.characteristics.camera}
					</p>
				</div>
				<div className={styles.toBasket}>
					<div>
						<h1>{formatPrice(telephone.price)}</h1>
						{telephone.amount <= 0 ? (
							<button className={styles.notAvailable}>Немає в наявності</button>
						) : (
							<button onClick={handleAddToBasket}>У кошик</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
