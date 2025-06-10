import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Product } from "../../components/product/Product";
import { usePhones } from "../../hooks/products/phones/usePhones";
import { banner } from "./assets";
import styles from "./Home.module.scss";

export const Home = () => {
	const navigate = useNavigate();
	const { data, isLoading } = usePhones(7);

	if (isLoading) {
		return (
			<div className={styles.loadingContainer}>
				<ClipLoader color="#95a3fa" loading={isLoading} size={30} />
			</div>
		);
	}

	const renderTelephones = () => {
		return data.map((telephone, index) => (
			<Product
				key={index}
				_id={telephone._id}
				picture={telephone.picture}
				name={telephone.name}
				price={telephone.price}
				amount={telephone.amount}
				product={telephone}
				productType={"telephone"}
			/>
		));
	};

	return (
		<div className={styles.home}>
			<div className={styles.banner}>
				<div className={styles.info}>
					<h1>Розумна колонка</h1>
					<h2>ЗНИЖКА 30%</h2>
					<h3>при покупці другого товару</h3>
				</div>
				<img src={banner} alt="banner" loading="lazy" />
			</div>
			<div className={styles.productsHeader}>
				<h1>Популярні Смартфони</h1>
				<span
					className={styles.allPhones}
					onClick={() => navigate("/product/telephones")}
				>
					Усі телефони →
				</span>
			</div>
			<div className={styles.products}>{renderTelephones()}</div>
		</div>
	);
};
