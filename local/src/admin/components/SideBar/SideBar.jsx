import { LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";

export const SideBar = ({ activeBtnOptions, setActiveBtnOptions }) => {
	const navigate = useNavigate();

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
					className={activeBtnOptions === 1 ? styles.active : ""}
					onClick={() => setActiveBtnOptions(prev => (prev = 1))}
				>
					<Link to='/admin/orders'>
						<h3>Замовлення</h3>
					</Link>
				</li>
				<li
					className={activeBtnOptions === 2 ? styles.active : ""}
					onClick={() => setActiveBtnOptions(prev => (prev = 2))}
				>
					<Link to='/admin/telephones'>
						<h3>Телефони</h3>
					</Link>
				</li>
				<li
					className={activeBtnOptions === 3 ? styles.active : ""}
					onClick={() => setActiveBtnOptions(prev => (prev = 3))}
				>
					<Link to='/admin/laptops'>
						<h3>Ноутбуки</h3>
					</Link>
				</li>
			</ul>
			<div onClick={() => onClickLogout()} className={styles.logout}>
				<LogOut />
				<h2>Вийти</h2>
			</div>
		</div>
	);
};
