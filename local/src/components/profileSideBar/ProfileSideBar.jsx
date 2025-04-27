import { List, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { icon_profile } from "../header/assets/";
import styles from "./ProfileSiBar.module.scss";

export const ProfileSideBar = ({ firstName, lastName, email }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentPath = location.pathname;
	const isOrders = currentPath.includes("/profile/orders");
	const isBasket = currentPath.includes("/profile/basket");

	const logout = () => {
		window.localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className={styles.profileSideBar}>
			<div className={styles.user}>
				<img
					src={icon_profile}
					width={24}
					height={24}
					style={{ marginLeft: "10px" }}
				/>
				<div>
					<p>
						{firstName} {lastName}
					</p>
					<p>{email}</p>
				</div>
			</div>
			<div className={styles.sideBarPages}>
				<div
					onClick={() => navigate("/profile/orders")}
					className={`${styles.item} ${isOrders ? styles.active : ""}`}
				>
					<List />
					<div>
						<p>Замовлення</p>
					</div>
				</div>
				<div
					onClick={() => navigate("/profile/basket")}
					className={`${styles.item} ${isBasket ? styles.active : ""}`}
				>
					<ShoppingCart />
					<div>
						<p>Кошик</p>
					</div>
				</div>
			</div>
			<div className={styles.logout}>
				<button onClick={logout}>Logout</button>
			</div>
		</div>
	);
};
