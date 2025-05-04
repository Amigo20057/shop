import { Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ProfileSideBar } from "../../components";
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

	if (isLoading) {
		return (
			<div className={styles.loadingContainer}>
				<ClipLoader color='#95a3fa' loading={isLoading} size={30} />
			</div>
		);
	}

	return (
		<div className={styles.profile}>
			<ProfileSideBar
				firstName={data.firstName}
				lastName={data.lastName}
				email={data.email}
			/>
			{/* <div className={styles.content}>
				<button onClick={logout}>Logout</button>
			</div> */}
			<Outlet />
		</div>
	);
};
