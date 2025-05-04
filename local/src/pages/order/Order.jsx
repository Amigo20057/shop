import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../../hooks/basket/useBasket";
import { useProductStore } from "../../zustand/store/store";

import styles from "./Order.module.scss";

export const Order = () => {
	const navigate = useNavigate();
	const clearBasket = useProductStore(state => state.clearBasket);
	const token = window.localStorage.getItem("token");
	const { data: basketData } = useBasket();
	console.log(basketData);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (basketData && basketData.length > 0) {
			const total = basketData.reduce(
				(acc, item) => acc + item.price * item.amount,
				0
			);

			const items = basketData.map(item => ({
				productId: item.id,
				amount: item.amount,
			}));

			setValue("totalPrice", total.toFixed(2));
			setValue("items", items);
		}
	}, [basketData, setValue]);

	const createOrderMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/orders/",
				values,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		onSuccess: () => {
			clearBasket();
			navigate("/profile/orders");
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message ||
						"Помилка створення замовлення. Перевірте дані."
				);
			} else {
				alert("Невідома помилка");
			}
		},
	});

	const onSubmit = values => {
		console.log(values);
		createOrderMutation.mutate(values);
	};

	const renderBasketItems = () => {
		if (!basketData || basketData.length === 0)
			return <div>Кошик порожній</div>;

		return (
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.cell}>Картинка</div>
					<div className={styles.cell}>Назва</div>
					<div className={styles.cell}>Кількість</div>
					<div className={styles.cell}>Ціна</div>
				</div>
				{basketData.map((product, index) => (
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
		);
	};

	return (
		<div className={styles.createOrderPage}>
			<div className={styles.container}>
				<h2>Оформлення замовлення</h2>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputGroup}>
						<label>ПІБ</label>
						<input
							type='text'
							{...register("fullName", { required: "Введіть ПІБ" })}
						/>
						{errors.fullName && <span>{errors.fullName.message}</span>}
					</div>

					<div className={styles.inputGroup}>
						<label>Email</label>
						<input
							type='email'
							{...register("email", { required: "Введіть email" })}
						/>
						{errors.email && <span>{errors.email.message}</span>}
					</div>

					<div className={styles.inputGroup}>
						<label>Номер телефону</label>
						<input
							type='tel'
							{...register("telephoneNumber", {
								required: "Введіть номер телефону",
							})}
						/>
						{errors.telephoneNumber && (
							<span>{errors.telephoneNumber.message}</span>
						)}
					</div>

					<div className={styles.inputGroup}>
						<label>Адреса</label>
						<input
							type='text'
							{...register("address", { required: "Введіть адресу" })}
						/>
						{errors.address && <span>{errors.address.message}</span>}
					</div>

					<input type='hidden' {...register("totalPrice")} />

					<div className={styles.itemsPlaceholder}>
						<h4>Ваші товари</h4>
						{renderBasketItems()}
					</div>

					<div className={styles.totalSum}>
						Загальна сума:{" "}
						<strong>
							{basketData
								?.reduce((acc, item) => acc + item.price * item.amount, 0)
								.toFixed(2)}{" "}
							₴
						</strong>
					</div>

					<button type='submit' className={styles.submitButton}>
						Підтвердити замовлення
					</button>
				</form>
			</div>
		</div>
	);
};
