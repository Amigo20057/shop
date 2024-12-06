import { useState } from "react";
import styles from "./CatalogSideBar.module.scss";

export const CatalogSideBar = ({ setFilters, productType }) => {
	const [filters, setLocalFilters] = useState({
		rom: null,
		ram: null,
		brand: null,
		cores: null,
		storage: null,
	});

	const options = {
		telephone: {
			rom: ["512 ГБ", "256 ГБ", "128 ГБ", "64 ГБ", "32 ГБ"],
			ram: ["2 ГБ", "3 ГБ", "4 ГБ", "6 ГБ", "8 ГБ"],
			brand: ["Apple", "Honor", "Samsung", "Huawei", "Xiaomi"],
			cores: ["4", "6", "8"],
		},
		laptop: {
			ram: ["4 ГБ", "8 ГБ", "16 ГБ"],
			storage: ["126 ГБ", "256 ГБ", "500 ГБ", "1 ТБ"],
			brand: ["Apple", "Honor", "Samsung", "Huawei", "Xiaomi"],
			cores: ["4", "8", "12"],
		},
	};

	const filterLabels = {
		rom: "Вбудована пам'ять",
		ram: "Оперативна пам'ять",
		brand: "Бренд",
		cores: "Кількість ядер",
		storage: "Накопичувач",
	};

	const handleCheckboxChange = (value, type) => {
		setLocalFilters(prev => {
			const updatedValue = prev[type] === value ? null : value;
			const updatedFilters = { ...prev, [type]: updatedValue };
			setFilters(updatedFilters);
			return updatedFilters;
		});
	};

	const removeFilters = () => {
		const resetFilters = Object.keys(filters).reduce(
			(acc, key) => ({ ...acc, [key]: null }),
			{}
		);
		setLocalFilters(resetFilters);
		setFilters(resetFilters);
	};

	return (
		<div className={styles.sideBar}>
			{productType in options &&
				Object.entries(options[productType]).map(([filterType, values]) => (
					<div key={filterType}>
						<h4>{filterLabels[filterType]}</h4>
						<ul>
							{values.map(value => (
								<li key={value}>
									<input
										type="checkbox"
										id={`${filterType}-${value}`}
										checked={filters[filterType] === value}
										onChange={() => handleCheckboxChange(value, filterType)}
									/>
									<label htmlFor={`${filterType}-${value}`}>{value}</label>
								</li>
							))}
						</ul>
					</div>
				))}
			<div>
				<p onClick={removeFilters} className={styles.clearFilters}>
					Скинути фільтри
				</p>
			</div>
		</div>
	);
};
