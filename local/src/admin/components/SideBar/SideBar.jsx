import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.adminSideBar}>
			<Link to='/admin/orders'>
				<button>
					<h2>Замовлення</h2>
				</button>
			</Link>
			<Link to='/admin/telephones'>
				<button>
					<h2>Телефони</h2>
				</button>
			</Link>
			<button
				style={{
					position: "absolute",
					bottom: "0",
				}}
				onClick={() => {
					window.localStorage.removeItem("token");
					navigate(0);
				}}
			>
				Вийти
			</button>
		</div>
	);
};
