import { LogOut } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const onClickLogout = () => {
		if (window.confirm("Ви впевнені, що хочете вийти?")) {
			window.localStorage.removeItem("token");
			navigate("/admin");
		}
	};

	return (
		<div className={styles.sideBar}>
			<h1>ADMIN PANEL</h1>
			<ul>
				<li
					className={location.pathname === "/admin/orders" ? styles.active : ""}
				>
					<Link to='/admin/orders'>
						<h3>Замовлення</h3>
					</Link>
				</li>
				<li
					className={
						location.pathname === "/admin/telephones" ? styles.active : ""
					}
				>
					<Link to='/admin/telephones'>
						<h3>Телефони</h3>
					</Link>
				</li>
				<li
					className={
						location.pathname === "/admin/laptops" ? styles.active : ""
					}
				>
					<Link to='/admin/laptops'>
						<h3>Ноутбуки</h3>
					</Link>
				</li>
			</ul>
			<div onClick={onClickLogout} className={styles.logout}>
				<LogOut />
				<h2>Вийти</h2>
			</div>
		</div>
	);
};
