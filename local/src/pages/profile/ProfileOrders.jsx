import { useOrders } from "../../hooks/orders/useOrders";
import styles from "./Profile.module.scss";

export const ProfileOrders = () => {
	const { data, isSuccess, status } = useOrders();

	if (!data || !isSuccess || status === "error" || data.length === 0) {
		return <div className={styles.empty}>Немає замовлень...</div>;
	}

	const renderOrder = () => {
		return data.map((order, orderIndex) => (
			<div className={styles.orderCard} key={orderIndex}>
				<div className={styles.orderInfo}>
					<h2 className={styles.orderTitle}>Замовлення #{orderIndex + 1}</h2>
					<p>
						<b>Дата:</b> {new Date(order.createdAt).toLocaleString()}
					</p>
					<p>
						<b>Ім’я:</b> {order.fullName}
					</p>
					<p>
						<b>Email:</b> {order.email}
					</p>
					<p>
						<b>Телефон:</b> {order.telephoneNumber}
					</p>
					<p>
						<b>Адреса:</b> {order.address}
					</p>
					<p>
						<b>Сума:</b> {order.totalPrice} ₴
					</p>
					<p>
						<b>Статус:</b> {order.status}
					</p>
				</div>
				<div className={styles.table}>
					<div className={styles.header}>
						<div className={styles.cell}>Картинка</div>
						<div className={styles.cell}>Назва</div>
						<div className={styles.cell}>Кількість</div>
						<div className={styles.cell}>Ціна</div>
					</div>
					{order.items.map((product, index) => (
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
					))}
				</div>
			</div>
		));
	};

	return <div className={styles.profileBasket}>{renderOrder()}</div>;
};
