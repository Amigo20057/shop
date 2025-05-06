import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./Auth.module.scss";

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const registerAdminMutation = useMutation({
		mutationFn: async values => {
			const response = await axios.post(
				"http://localhost:4000/user/register-admin",
				values
			);
			if (!response || !response.data.token) {
				throw new Error("Token not found in response");
			}
			window.localStorage.setItem("token", response.data.token);
			return response.data;
		},
		onSuccess: data => {
			window.location.href = "/admin/orders";
		},
		onError: error => {
			console.error("Error register", error);
			if (axios.isAxiosError(error)) {
				alert(
					error.response?.data?.message || "Помилка реєстрації. Перевірте дані."
				);
			} else {
				alert("Невідома помилка при реєстрації");
			}
		},
	});

	const onSubmit = values => {
		registerAdminMutation.mutate(values);
	};

	return (
		<div className={styles.authPages}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.title}>Реєстрація для адміністратора</h2>

				<div className={styles.field}>
					<label>Ім'я</label>
					<input
						type='text'
						{...register("firstName", { required: "Ім'я обовʼязкове" })}
					/>
					{errors.firstName && (
						<p className={styles.error}>{errors.firstName.message}</p>
					)}
				</div>

				<div className={styles.field}>
					<label>Прізвище</label>
					<input
						type='text'
						{...register("lastName", { required: "Прізвище обовʼязкове" })}
					/>
					{errors.lastName && (
						<p className={styles.error}>{errors.lastName.message}</p>
					)}
				</div>

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
					disabled={registerAdminMutation.isPending}
				>
					{registerAdminMutation.isPending ? "Вхід..." : "Зареєструватися"}
				</button>
			</form>
		</div>
	);
};
