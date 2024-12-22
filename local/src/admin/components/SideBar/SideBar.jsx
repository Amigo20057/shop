import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";

export const SideBar = ({ activeBtnOptions, setActiveBtnOptions }) => {
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
		</div>
	);
};
