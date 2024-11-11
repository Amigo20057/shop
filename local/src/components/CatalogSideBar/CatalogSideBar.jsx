import { useState } from "react";
import styles from "./CatalogSideBar.module.scss";

export const CatalogSideBar = ({ setFilters, productType }) => {
	const [selectedRom, setSelectedRom] = useState(null);
	const [selectedRam, setSelectedRam] = useState(null);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedCores, setSelectedCores] = useState(null);

	const handleCheckboxChange = (value, type) => {
		if (type === "rom") {
			const rom = selectedRom === value ? null : value;
			setSelectedRom(rom);
			setFilters(prev => ({ ...prev, rom }));
		} else if (type === "ram") {
			const ram = selectedRam === value ? null : value;
			setSelectedRam(ram);
			setFilters(prev => ({ ...prev, ram }));
		} else if (type === "brand") {
			const brand = selectedBrand === value ? null : value;
			setSelectedBrand(brand);
			setFilters(prev => ({ ...prev, brand }));
		} else if (type === "cores") {
			const cores = selectedCores === value ? null : value;
			setSelectedCores(cores);
			setFilters(prev => ({ ...prev, cores }));
		}
	};

	const removeFilters = () => {
		setSelectedRom(null);
		setSelectedRam(null);
		setSelectedBrand(null);
		setSelectedCores(null);
		setFilters({});
	};
	return (
		<div className={styles.sideBar}>
			<div>
				Вбудована пам'ять
				<ul>
					<li>
						<input
							type="checkbox"
							checked={selectedRom === "512 ГБ"}
							onChange={() => handleCheckboxChange("512 ГБ", "rom")}
						/>
						<label>512 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRom === "256 ГБ"}
							onChange={() => handleCheckboxChange("256 ГБ", "rom")}
						/>
						<label>256 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRom === "128 ГБ"}
							onChange={() => handleCheckboxChange("128 ГБ", "rom")}
						/>
						<label>128 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRom === "64 ГБ"}
							onChange={() => handleCheckboxChange("64 ГБ", "rom")}
						/>
						<label>64 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRom === "32 ГБ"}
							onChange={() => handleCheckboxChange("32 ГБ", "rom")}
						/>
						<label>32 ГБ</label>
					</li>
				</ul>
			</div>
			<div>
				Оперативна пам'ять
				<ul>
					<li>
						<input
							type="checkbox"
							checked={selectedRam === "2 ГБ"}
							onChange={() => handleCheckboxChange("2 ГБ", "ram")}
						/>
						<label>2 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRam === "3 ГБ"}
							onChange={() => handleCheckboxChange("3 ГБ", "ram")}
						/>
						<label>3 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRam === "4 ГБ"}
							onChange={() => handleCheckboxChange("4 ГБ", "ram")}
						/>
						<label>4 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRam === "6 ГБ"}
							onChange={() => handleCheckboxChange("6 ГБ", "ram")}
						/>
						<label>6 ГБ</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedRam === "8 ГБ"}
							onChange={() => handleCheckboxChange("8 ГБ", "ram")}
						/>
						<label>8 ГБ</label>
					</li>
				</ul>
			</div>
			<div>
				Бренд
				<ul>
					<li>
						<input
							type="checkbox"
							checked={selectedBrand === "Apple"}
							onChange={() => handleCheckboxChange("Apple", "brand")}
						/>
						<label>Apple</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedBrand === "Honor"}
							onChange={() => handleCheckboxChange("Honor", "brand")}
						/>
						<label>Honor</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedBrand === "Samsung"}
							onChange={() => handleCheckboxChange("Samsung", "brand")}
						/>
						<label>Samsung</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedBrand === "Huawei"}
							onChange={() => handleCheckboxChange("Huawei", "brand")}
						/>
						<label>Huawei</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedBrand === "Xiaomi"}
							onChange={() => handleCheckboxChange("Xiaomi", "brand")}
						/>
						<label>Xiaomi</label>
					</li>
				</ul>
			</div>
			<div>
				Кількість ядер
				<ul>
					<li>
						<input
							type="checkbox"
							checked={selectedCores === "4"}
							onChange={() => handleCheckboxChange("4", "cores")}
						/>
						<label>4</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedCores === "6"}
							onChange={() => handleCheckboxChange("6", "cores")}
						/>
						<label>6</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedCores === "8"}
							onChange={() => handleCheckboxChange("8", "cores")}
						/>
						<label>8</label>
					</li>
				</ul>
			</div>
			<div>
				<p onClick={() => removeFilters()}>Скинути фільтри</p>
			</div>
		</div>
	);
};
