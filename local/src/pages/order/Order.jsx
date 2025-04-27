import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styles from "./Order.module.scss";

export const Order = () => {
	const token = window.localStorage.getItem("token");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		onSuccess: data => {
			console.log("Order created ", data);
			window.location.href = "/profile";
		},
		onError: error => {
			console.log("Error create order ", error);
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

	const onsubmit = async values => {
		createOrderMutation.mutate(values);
	};

	return (
		<div className={styles.createOrderPage}>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onsubmit)}></form>
			</div>
		</div>
	);
};
