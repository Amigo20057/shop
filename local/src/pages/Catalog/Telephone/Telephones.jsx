import { ChevronLeft } from "lucide-react";
import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CatalogSideBar, Product } from "../../../components";
import { useFilterPhone } from "../../../hooks/products/phones/useFilterPhone";
import { usePhones } from "../../../hooks/products/phones/usePhones";
import styles from "./Telephones.module.scss";

export const Telephones = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// Преобразуем searchParams в обычный объект
	const queryFilters = useMemo(() => {
		const entries = {};
		for (const [key, value] of searchParams.entries()) {
			entries[key] = value;
		}
		return Object.keys(entries).length > 0 ? entries : null;
	}, [searchParams]);

	const { data: allPhones, isLoading: isAllLoading } = usePhones(
		null,
		!queryFilters
	);

	const { data: filteredPhones, isLoading: isFilteredLoading } =
		useFilterPhone(queryFilters);

	const isLoading = queryFilters ? isFilteredLoading : isAllLoading;
	const phones = queryFilters ? filteredPhones : allPhones;

	if (isLoading) {
		return <div>...loading</div>;
	}

	const renderTelephones = () => {
		return phones?.map((telephone, index) => (
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
		<div className={styles.Products}>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<ChevronLeft size={40} />
				<h1>Смартфони</h1>
			</div>

			<CatalogSideBar
				setQueryFilters={filters => setSearchParams(filters)}
				queryFilters={queryFilters}
				productType={"telephone"}
			/>

			<div className={styles.product}>{renderTelephones()}</div>
		</div>
	);
};
