import { useState } from "react";
import styles from "./CatalogSideBar.module.scss";

export const CatalogSideBar = () => {
	const [selectedMemory, setSelectedMemory] = useState(null);
	const [selectedRam, setSelectedRam] = useState(null);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedCores, setSelectedCores] = useState(null);

	const handleCheckboxChange = (value, type) => {
		if (type === "memory") {
			setSelectedMemory(selectedMemory === value ? null : value);
		} else if (type === "ram") {
			setSelectedRam(selectedRam === value ? null : value);
		} else if (type === "brand") {
			setSelectedBrand(selectedBrand === value ? null : value);
		} else if (type === "cores") {
			setSelectedCores(selectedCores === value ? null : value);
		}
	};

	return (
		<div className={styles.sideBar}>
			<div>
				Вбудована пам'ять
				<ul>
					<li>
						<input
							type="checkbox"
							checked={selectedMemory === "512 Гб"}
							onChange={() => handleCheckboxChange("512 Гб", "memory")}
						/>
						<label>512 Гб</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedMemory === "256 Гб"}
							onChange={() => handleCheckboxChange("256 Гб", "memory")}
						/>
						<label>256 Гб</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedMemory === "128 Гб"}
							onChange={() => handleCheckboxChange("128 Гб", "memory")}
						/>
						<label>128 Гб</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedMemory === "64 Гб"}
							onChange={() => handleCheckboxChange("64 Гб", "memory")}
						/>
						<label>64 Гб</label>
					</li>
					<li>
						<input
							type="checkbox"
							checked={selectedMemory === "32 Гб"}
							onChange={() => handleCheckboxChange("32 Гб", "memory")}
						/>
						<label>32 Гб</label>
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
		</div>
	);
};
