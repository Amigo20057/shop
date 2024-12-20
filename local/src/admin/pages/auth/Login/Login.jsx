import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkAuth, login } from "../../../../Api/Auth/AuthApi";
import styles from "./Login.module.scss";

export const Login = () => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const authStatus = await checkAuth();
				if (authStatus) {
					navigate("/admin");
				}
				setIsAuth(authStatus);
			} catch (error) {
				console.error("Ошибка проверки авторизации", error);
			}
		};
		fetchAuth();
	}, [navigate]);

	const onSubmit = async values => {
		try {
			const data = await login(values);
			if (!data) {
				alert("Не вдалось авторизуватися");
				return;
			}
			if ("token" in data) {
				window.localStorage.setItem("token", data.token);
				navigate("/admin");
			}
		} catch (error) {
			alert("Помилка авторизації: " + error.message);
		}
	};

	return (
		<div className={styles.login}>
			<h1>Авторизація</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("email", { required: "Вкажіть почту" })}
					placeholder='E-mail'
					type='email'
				/>
				<input
					{...register("password", { required: "Вкажіть пароль" })}
					placeholder='Пароль'
					type='password'
				/>
				<button type='submit'>Увійти</button>
			</form>
		</div>
	);
};
