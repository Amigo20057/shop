import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";

export const Login = () => {
	const { register, handleSubmit } = useForm();

	const loginMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/login",
				values
			);
			if (!response || !response.data.token) {
				alert("Error login");
			}
			window.localStorage.setItem("token", response.data.token);

			return response.data;
		},
		onSuccess: data => {
			console.log("login data ", data);
			window.location.href = "/profile";
		},
		onError: error => {
			console.error("Error login ", error);
		},
	});

	const onSubmit = async values => {
		loginMutation.mutate(values);
	};

	return (
		<div className={styles.login}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='email' placeholder='Email' {...register("email")} />
				<input
					type='password'
					placeholder='Password'
					{...register("password")}
				/>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};
