import { useProfile } from "../../hooks/user/useProfile";
import styles from "./Profile.module.scss";

export const Profile = () => {
	const token = window.localStorage.getItem("token");
	const { data, isLoading, status } = useProfile(token);

	if (!token || status === "error" || !data) {
		return (
			<div className={styles.authButtons} style={{}}>
				<button onClick={() => (window.location.href = "/auth/login")}>
					Увійти
				</button>
				<button onClick={() => (window.location.href = "/auth/register")}>
					Зареєструватися
				</button>
			</div>
		);
	}

	const logout = () => {
		window.localStorage.removeItem("token");
		window.location.reload();
	};

	if (isLoading) {
		return <div>...loading</div>;
	}

	console.log(data);
	return (
		<div className={styles.profile}>
			{data.firstName}
			<button onClick={logout}>Logout</button>
		</div>
	);
};
