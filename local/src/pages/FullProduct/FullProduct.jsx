import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneTelephones } from "../../Api/Telephones/TelephoneApi";
import styles from "./FullProduct.module.scss";

export const FullProduct = () => {
	const [telephone, setTelephone] = useState();
	const { id } = useParams();

	useEffect(() => {
		const fetchTelephone = async () => {
			const data = await getOneTelephones(id);
			setTelephone(data);
		};
		if (id) fetchTelephone();
	}, [id]);

	console.log(telephone);

	return (
		<div className={styles.FullProduct}>
			<div className={styles.contentInfo}>
				<img src='' alt='' />
				<div className={styles.info}></div>
				<div className={styles.toBasket}></div>
			</div>
		</div>
	);
};
