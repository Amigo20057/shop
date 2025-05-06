import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SideBar } from "../../components/sideBar/SideBar";
import styles from "./Telephones.module.scss";

export const Telephones = () => {
	const queryClient = useQueryClient();
	const token = window.localStorage.getItem("token");
	const { data, isLoading } = useQuery({
		queryKey: ["telephones"],
		queryFn: async () => {
			const response = await axios.get("http://localhost:4000/products/phones");
			return response;
		},
		select: data => data.data,
		enabled: !!token,
	});

	const incrementAmountMutation = useMutation({
		mutationFn: async productId => {
			const response = await axios.patch(
				`http://localhost:4000/products/phones/change-amount/${productId}?method=inc`,
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
			queryClient.invalidateQueries(["telephones"]);
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
				`http://localhost:4000/products/phones/change-amount/${productId}?method=dec`,
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
			queryClient.invalidateQueries(["telephones"]);
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

	const renderTelephones = () => {
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
					<button onClick={() => incrementProduct(product._id)}>+</button>
					<button onClick={() => decrementProduct(product._id)}>-</button>
				</div>
			</div>
		));
	};

	return (
		<div className={styles.adminLayout}>
			<SideBar />
			<div className={styles.content}>
				{isLoading ? (
					<>...loading</>
				) : !data || data.length === 0 ? (
					<p>Немає телефонів</p>
				) : (
					<div className={styles.table}>
						<div className={styles.header}>
							<div className={styles.cell}>Картинка</div>
							<div className={styles.cell}>Назва</div>
							<div className={styles.cell}>Кількість</div>
							<div className={styles.cell}>Ціна</div>
							<div className={styles.cell}>Змінити кількість</div>
						</div>
						{renderTelephones()}
					</div>
				)}
			</div>
		</div>
	);
};
