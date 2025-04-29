import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Auth.module.scss";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const loginMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/login",
				values
			);
			if (!response || !response.data.token) {
				throw new Error("Token not found in response");
			}
			window.localStorage.setItem("token", response.data.token);
			return response.data;
		},
		onSuccess: data => {
			console.log("Login success", data);
			window.location.href = "/profile/orders";
		},
		onError: error => {
			console.error("Error login", error);
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message ||
						"Помилка авторизації. Перевірте дані."
				);
			} else {
				alert("Невідома помилка при вході");
			}
		},
	});

	const onSubmit = async values => {
		loginMutation.mutate(values);
	};

	return (
		<div className={styles.authPage}>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
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
								message: "Мінімум 5 символів",
							},
						})}
					/>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}

					<button type='submit' disabled={loginMutation.isPending}>
						{loginMutation.isPending ? "Вхід..." : "Увійти"}
					</button>
				</form>
			</div>
		</div>
	);
};
