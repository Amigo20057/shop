import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { checkAuth, login } from "../../../Api/Auth/AuthApi";

export const Login = () => {
	const [isAuth, setIsAuth] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		const fetchAuth = async () => {
			const authStatus = await checkAuth();
			setIsAuth(authStatus);
		};
		fetchAuth();
	}, []);

	const onSubmit = async values => {
		try {
			const data = await login(values);
			if (!data) {
				alert("Не вдалось авторизуватися");
				return;
			}
			if ("token" in data) {
				alert(data.token);
				window.localStorage.setItem("token", data.token);
			}
		} catch (error) {
			alert("Помилка авторизації: " + error.message);
		}
	};

	// if(isAuth){
	// 	return <Navigate to={}
	// }

	return (
		<div>
			<h1>Авторизація</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("email", { required: "Вкажіть почту" })}
					placeholder="E-mail"
					type="email"
				/>
				<input
					{...register("password", { required: "Вкажіть пароль" })}
					placeholder="Пароль"
					type="password"
				/>
				<button type="submit">Увійти</button>
			</form>
		</div>
	);
};
