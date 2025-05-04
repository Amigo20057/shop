import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./Auth.module.scss";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const loginAdminMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/login",
				values
			);
			if (!response || !response.data.token) {
				throw new Error("Token not found in response");
			}
			if (!response.data.isAdmin) {
				throw new Error("User not admin");
			}
			window.localStorage.setItem("token", response.data.token);
			return response.data;
		},
		onSuccess: data => {
			console.log("Login success", data);
			window.location.href = "/admin/";
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

	const onSubmit = values => {
		loginAdminMutation.mutate(values);
	};

	return (
		<div className={styles.authPages}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.title}>Вхід для адміністратора</h2>

				<div className={styles.field}>
					<label>Email</label>
					<input
						type='email'
						{...register("email", { required: "Email обовʼязковий" })}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
				</div>

				<div className={styles.field}>
					<label>Пароль</label>
					<input
						type='password'
						{...register("password", { required: "Пароль обовʼязковий" })}
					/>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}
				</div>

				<button
					type='submit'
					className={styles.button}
					disabled={loginAdminMutation.isPending}
				>
					{loginAdminMutation.isPending ? "Вхід..." : "Увійти"}
				</button>
			</form>
		</div>
	);
};
