import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useProduct } from "../../../hooks/products/useProduct";
import { useProductStore } from "../../../zustand/store/store";

import styles from "./FullProductTelephone.module.scss";

export const FullProductTelephone = () => {
	const { id } = useParams();
	const addToBasket = useProductStore(state => state.addToBasket);
	const { data, isLoading } = useProduct(id);
	const navigate = useNavigate();

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	const handleAddToBasket = () => {
		const _id = data._id;
		const picture = data.picture;
		const name = data.name;
		const price = data.price;
		const productType = "telephone";
		addToBasket({ _id, picture, name, price, productType });
	};

	if (isLoading) {
		return (
			<div className={styles.loadingContainer}>
				<ClipLoader color='#95a3fa' loading={isLoading} size={30} />
			</div>
		);
	}

	return (
		<div className={styles.FullProduct}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Карточка товара</h1>
			</div>
			<div className={styles.contentInfo}>
				<img
					src={`http://localhost:4000/phone/pictures/${data.picture}`}
					alt={data.name}
				/>
				<div className={styles.info}>
					<h1>{data.name}</h1>
					<h3>Характеристики: </h3>
					<p>Екран:_________________________________ {data.screen}</p>
					<p>Кількість ядер:________________________ {data.cores}</p>
					<p>Потужність блоку живлення:_________ {data.battery}</p>
					<p>Оперативна пам'ять (RAM):___________ {data.ram}</p>
					<p>Вбудована пам'ять (ROM):____________ {data.rom}</p>
					<p>Основная камера МПикс:_____________ {data.camera}</p>
				</div>
				<div className={styles.toBasket}>
					<div>
						<h1>{formatPrice(data.price)}</h1>
						{data.amount <= 0 ? (
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
