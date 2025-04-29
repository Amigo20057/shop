import { useBasket } from "../../hooks/basket/useBasket";
import styles from "./Profile.module.scss";

export const ProfileBasket = () => {
	const { data, isSuccess, status } = useBasket();

	if (!data || !isSuccess || status === "error") {
		return <div>Кошик порожній</div>;
	}

	const renderBasketProduct = () => {
		return data.map((product, index) => (
			<div className={styles.row} key={index}>
				<div className={styles.cell}>
					<img
						src={`http://localhost:4000/phone/pictures/${product.picture}`}
						alt={product.name}
					/>
				</div>
				<div className={styles.cell}>{product.name}</div>
				<div className={styles.cell}>{product.amount}</div>
				<div className={styles.cell}>{product.price} ₴</div>
			</div>
		));
	};

	return (
		<div className={styles.profileBasket}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.cell}>Картинка</div>
					<div className={styles.cell}>Назва</div>
					<div className={styles.cell}>Кількість</div>
					<div className={styles.cell}>Ціна</div>
				</div>
				{renderBasketProduct()}
			</div>
		</div>
	);
};
