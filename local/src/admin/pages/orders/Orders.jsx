import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../components/sideBar/SideBar";
import styles from "./Orders.module.scss";

const getOrders = async token => {
	return await axios.get("http://localhost:4000/orders/admin-orders", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const Orders = () => {
	const token = window.localStorage.getItem("token");
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/admin/login");
		}
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["orders"],
		queryFn: () => getOrders(token),
		select: data => data.data,
		enabled: !!token,
	});

	const newStatusOrderMutation = useMutation({
		mutationFn: async ({ orderId, values }) => {
			await axios.patch(`http://localhost:4000/orders/${orderId}`, values, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	const handleProcessedOrder = orderId => {
		newStatusOrderMutation.mutate({
			orderId,
			values: { status: "PROCESSED" },
		});
	};

	const handleRejectOrder = orderId => {
		newStatusOrderMutation.mutate({
			orderId,
			values: { status: "REJECTION" },
		});
	};

	if (isLoading) {
		return <div>...loading</div>;
	}

	const renderOrder = () => {
		if (!data || !Array.isArray(data)) return null;
		return data.map((order, orderIndex) => (
			<div className={styles.orderCard} key={orderIndex}>
				<div className={styles.orderInfo}>
					<h2 className={styles.orderTitle}>Замовлення id: {order.id}</h2>
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
				<div className={styles.buttons}>
					<button
						onClick={() => handleProcessedOrder(order.id)}
						className={styles.acceptButton}
					>
						Прийняти
					</button>
					<button
						onClick={() => handleRejectOrder(order.id)}
						className={styles.rejectButton}
					>
						Відхилити
					</button>
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

	return (
		<div className={styles.adminLayout}>
			<SideBar />
			<div className={styles.content}>
				<h1>Замовлення</h1>
				{isLoading ? (
					<div>...loading</div>
				) : !data || data.length === 0 ? (
					<p>Список замовлень пустий...</p>
				) : (
					renderOrder()
				)}
			</div>
		</div>
	);
};
