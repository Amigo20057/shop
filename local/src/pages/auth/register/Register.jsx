import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Auth.module.scss";

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const registerMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/register",
				values
			);
			if (!response || !response.data.token) {
				throw new Error("Token not found in response");
			}
			window.localStorage.setItem("token", response.data.token);
			return response.data;
		},
		onSuccess: data => {
			window.location.href = "/profile/orders";
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message || "Серверна помилка при реєстрації";
				alert(message);
			} else {
				alert("Невідома помилка при реєстрації");
			}
		},
	});

	const onSubmit = async values => {
		registerMutation.mutate(values);
	};

	return (
		<div className={styles.authPage}>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						placeholder="Ім'я"
						{...register("firstName", { required: "Ім'я обов'язкове" })}
					/>
					{errors.firstName && (
						<p className={styles.error}>{errors.firstName.message}</p>
					)}

					<input
						type='text'
						placeholder='Прізвище'
						{...register("lastName", { required: "Прізвище обов'язкове" })}
					/>
					{errors.lastName && (
						<p className={styles.error}>{errors.lastName.message}</p>
					)}

					<input
						type='email'
						placeholder='Email'
						{...register("email", {
							required: "Email обов'язковий",
							pattern: {
								value: /^\S+@\S+\.\S+$/,
								message: "Некоректний email",
							},
						})}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}

					<input
						type='password'
						placeholder='Пароль'
						{...register("password", {
							required: "Пароль обов'язковий",
							minLength: {
								value: 5,
								message: "Пароль має містити щонайменше 5 символів",
							},
						})}
					/>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}

					<button type='submit' disabled={registerMutation.isPending}>
						{registerMutation.isPending ? "Реєстрація..." : "Зареєструватися"}
					</button>
				</form>
			</div>
		</div>
	);
};
