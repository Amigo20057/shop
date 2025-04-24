import { Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../../../Api/Orders/OrdersApi";
import styles from "./Order.module.scss";

export const Order = () => {
	const [orders, setOrders] = useState([]);

	const fetchOrders = useCallback(async () => {
		try {
			const data = await getAllOrders();
			setOrders(data);
		} catch (error) {
			console.error("Ошибка при загрузке заказов:", error);
		}
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	const renderOrders = () => {
		if (!Array.isArray(orders) || orders.length === 0) {
			return (
				<span style={{ color: "#fff", marginLeft: "50px" }}>
					Немає замовлень
				</span>
			);
		}

		const removeOrder = async id => {
			try {
				await deleteOrder(id);
				setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
			} catch (error) {
				console.error("Ошибка при удалении заказа:", error);
			}
		};

		return orders.map(order => (
			<li key={order._id}>
				<div className={styles.itemId}>
					<h4>{order._id}</h4>
				</div>
				<div className={styles.itemUserEmail}>
					<h4>{order.email}</h4>
				</div>
				<div className={styles.itemPrice}>
					<h4>{order.totalPrice} грн</h4>
				</div>
				<div className={styles.buttons}>
					<button onClick={() => removeOrder(order._id)}>
						<Check color='green' />
					</button>
					<button onClick={() => removeOrder(order._id)}>
						<X color='red' />
					</button>
				</div>
			</li>
		));
	};

	return (
		<div className={styles.order}>
			<div className={styles.container}>
				<h1>Усі замовлення</h1>
				<div className={styles.content}>
					<ul>{renderOrders()}</ul>
				</div>
			</div>
		</div>
	);
};
