import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useBasket } from "../../hooks/basket/useBasket";
import { useProductStore } from "../../zustand/store/store";
import styles from "./Profile.module.scss";

export const ProfileBasket = () => {
	const { data, isSuccess, status } = useBasket();
	const ip = useProductStore(state => state.incrementAmount);
	const dp = useProductStore(state => state.decreaseAmount);
	const token = window.localStorage.getItem("token");
	const queryClient = useQueryClient();

	const incrementAmountMutation = useMutation({
		mutationFn: async productId => {
			const response = await axios.patch(
				`http://localhost:4000/basket/${productId}?method=inc`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["basket"]);
		},
		onError: error => {
			console.error("Error increment amount", error);
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message ||
						"Помилка збільшення кількості товару."
				);
			} else {
				alert("Невідома помилка при збільшенні кількості товару");
			}
		},
	});

	const decrementAmountMutation = useMutation({
		mutationFn: async productId => {
			const response = await axios.patch(
				`http://localhost:4000/basket/${productId}?method=dec`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["basket"]);
		},
		onError: error => {
			console.error("Error decrement amount", error);
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message ||
						"Помилка зменьшення кількості товару."
				);
			} else {
				alert("Невідома помилка при зменшенні кількості товару");
			}
		},
	});

	const incrementProduct = productId => {
		incrementAmountMutation.mutate(productId);
	};

	const decrementProduct = productId => {
		decrementAmountMutation.mutate(productId);
	};

	if (!data || !isSuccess || status === "error" || data.length === 0) {
		return (
			<div
				style={{
					marginTop: "50px",
					marginLeft: "50px",
					fontSize: "24px",
				}}
			>
				Кошик порожній....
			</div>
		);
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
				<div className={styles.cell}>
					<button onClick={() => incrementProduct(product.id)}>+</button>
					<button onClick={() => decrementProduct(product.id)}>-</button>
				</div>
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
					<div className={styles.cell}>Змінити кількість</div>
				</div>
				{renderBasketProduct()}
			</div>
		</div>
	);
};
