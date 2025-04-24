import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Register.module.scss";

export const Register = () => {
	const { register, handleSubmit } = useForm();

	const registerMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/register",
				values
			);
			if (!response || !response.data.token) {
				alert("Error register");
			}
			window.localStorage.setItem("token", response.data.token);
			return response.data;
		},
		onSuccess: data => {
			console.log("Register error ", data);
			window.location.href = "/profile";
		},
		onError: error => {
			console.log("Error register ", error);
		},
	});

	const onSubmit = async values => {
		registerMutation.mutate(values);
	};

	return (
		<div className={styles.register}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='text' placeholder="Ім'я" {...register("firstName")} />
				<input type='text' placeholder='Прізвище' {...register("lastName")} />
				<input type='email' placeholder='email' {...register("email")} />
				<input type='password' placeholder='Пароль' {...register("password")} />
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};
