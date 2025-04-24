import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/products/useProduct";
import styles from "./FullProductTelephone.module.scss";

export const FullProductTelephone = () => {
	const { id } = useParams();
	const { data, isLoading } = useProduct(id);
	const navigate = useNavigate();
	// const addToBasket = useProductStore(state => state.addToBasket);

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	const handleAddToBasket = () => {
		const _id = telephone._id;
		const picture = telephone.picture;
		const name = telephone.name;
		const price = telephone.price;
		const productType = "telephone";
		addToBasket({ _id, picture, name, price, productType });
	};

	console.log(data);

	if (isLoading) {
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
