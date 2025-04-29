import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../Api/axios";
import { useProductStore } from "../../../Api/store/store";
import { useProfile } from "../../../hooks/user/useProfile";
import styles from "./Basket.module.scss";

export const Basket = ({ isOpenBasket, setIsOpenBasket }) => {
	const navigate = useNavigate();
	const products = useProductStore(state => state.products);
	const token = window.localStorage.getItem("token");
	const { data, isLoading, status } = useProfile(token);
	const decreaseAmountBasket = useProductStore(state => state.decreaseAmount);
	const clearBasket = useProductStore(state => state.clearBasket);
	const [totalPrice, setTotalPrice] = useState(0);
	const [order, setOrder] = useState([]);
	const [email, setEmail] = useState("");

	console.log(products);

	const syncBasket = useMutation({
		mutationFn: async values => {
			await axios.post("http://localhost:4000/basket/sync-basket", values, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		onSuccess: data => {
			console.log("sync success", data);
		},
		onError: error => {
			console.error("Error sync basket", error);
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message ||
						"Помилка авторизації. Перевірте дані."
				);
			} else {
				alert("Невідома помилка");
			}
		},
	});

	const sync = async () => {
		if (!token) return;

		const preparedProducts = {
			items: products.map(product => ({
				productId: product._id,
				amount: product.amount,
			})),
		};
		syncBasket.mutate(preparedProducts);
	};

	const formatPrice = new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency: "UAH",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format;

	const handleRemoveFromBasket = id => {
		decreaseAmountBasket(id);
	};

	useEffect(() => {
		const fetchSync = async () => {
			await sync();
		};

		fetchSync();
	}, [isOpenBasket]);

	useEffect(() => {
		const newTotalPrice = products.reduce((sum, product) => {
			return sum + product.price * product.amount;
		}, 0);
		setTotalPrice(newTotalPrice);
	}, [products]);

	const createOrder = async () => {
		const order = {
			products,
			email,
		};
		setOrder(order);

		try {
			await axios.post("/order/buy", order);
			alert("Замовлення створене");
			setIsOpenBasket(false);
			clearBasket();
		} catch (err) {
			console.log(err);
			alert("Помилка при створенні замовлення");
			setIsOpenBasket(false);
			clearBasket();
		}
	};

	const renderProducts = () => {
		return products.map(product => (
			<div
				className={styles.product}
				key={product._id}
				onClick={() => handleRemoveFromBasket(product._id)}
			>
				<div
					className={`${styles.img} ${
						product.productType === "laptop"
							? styles.laptop
							: product.productType === "telephone"
							? styles.telephone
							: ""
					}`}
				>
					<img
						src={
							product.productType === "laptop"
								? `http://localhost:4000/laptops/${product.picture}`
								: product.productType === "telephone"
								? `http://localhost:4000/phone/pictures/${product.picture}`
								: ""
						}
						alt={product.name}
					/>
				</div>
				<div className={styles.productName}>
					<h3>{product.name}</h3>
				</div>
				<div className={styles.productPrice}>
					<h3>{formatPrice(product.price)}</h3>
					<h3>Кількість: {product.amount}</h3>
				</div>
			</div>
		));
	};

	return (
		<div className={isOpenBasket ? styles.Basket : styles.closeBasket}>
			<div
				onClick={() => setIsOpenBasket(false)}
				className={styles.filter}
			></div>
			<div
				className={`${styles.products} ${
					isOpenBasket ? styles.fadeIn : styles.fadeOut
				}`}
			>
				<h1>Кошик</h1>
				{products.length === 0 && (
					<p className={styles.voidBasket}>Кошик пустий...</p>
				)}
				{renderProducts()}
				<div className={styles.totalPrice}>
					<h1>
						Загальна ціна <span>{formatPrice(totalPrice)}</span>
					</h1>
				</div>
				{products.length !== 0 && (
					<div className={styles.buyProducts}>
						{/* <input
							type='email'
							id='email'
							placeholder='email'
							onChange={e => setEmail(e.target.value)}
						/> */}
						{!token || status === "error" || !data ? (
							<>
								<p style={{ fontSize: "14px", fontWeight: "300" }}>
									Увійдіть в акаует щоб замовити
								</p>
								<button onClick={() => (window.location.href = "/auth/login")}>
									Увійти
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => {
										navigate("/create-order");
										setIsOpenBasket(false);
									}}
								>
									Замовити
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
