import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Basket } from "../../ui/modals/Basket/Basket";
import { icon_basket, icon_profile, icon_search } from "./assets";
import styles from "./Header.module.scss";

const getProductByName = async name => {
	const response = await axios.get("http://localhost:4000/products/search", {
		params: { name },
	});
	return response.data;
};

export const Header = () => {
	const [querySearch, setQuerySearch] = useState("");
	const [searchResult, setSearchResult] = useState(null);
	const [isOpenBasket, setIsOpenBasket] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const searchRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = e => {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setIsSearch(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (querySearch.trim().length === 0) {
			setIsSearch(false);
		}
	});

	const handleSearch = async () => {
		if (querySearch.trim().length > 0) {
			try {
				const data = await getProductByName(querySearch);
				setSearchResult(data);
				setIsSearch(true);
			} catch (error) {
				console.error("Search error:", error);
				setIsSearch(false);
			}
		}
	};

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className={styles.header}>
			<Link to='/' className={styles.logo}>
				<h1>GLANCE</h1>
			</Link>
			<div className={styles.search}>
				<img src={icon_search} alt='search' />
				<input
					type='text'
					placeholder='Пошук'
					value={querySearch}
					onChange={e => setQuerySearch(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{isSearch && searchResult?.length > 0 && (
				<div className={styles.searchProduct} ref={searchRef}>
					{searchResult.map(product => (
						<Link
							to={`/product/telephone/${product._id}`}
							className={styles.searchItem}
							key={product._id}
							onClick={() => setIsSearch(false)}
						>
							<img
								src={`http://localhost:4000/phone/pictures/${product.picture}`}
								alt={product.name}
							/>
							<p>{product.name}</p>
						</Link>
					))}
				</div>
			)}
			<div className={styles.tabBar}>
				<div
					className={styles.basket}
					onClick={() => setIsOpenBasket(!isOpenBasket)}
				>
					<img src={icon_basket} alt='basket' />
					<p>Кошик</p>
				</div>
				<div
					className={styles.profile}
					onClick={() => (window.location.href = "/profile/orders")}
				>
					<img src={icon_profile} alt='profile' />
					<p>Профіль</p>
				</div>
			</div>
			<div>
				<Basket isOpenBasket={isOpenBasket} setIsOpenBasket={setIsOpenBasket} />
			</div>
		</div>
	);
};
