import LaptopModel from "./model/Laptop.js";

export class LaptopService {
	async findByName(name) {
		return await LaptopModel.findOne({ name: name });
	}

	async getAll() {
		return await LaptopModel.find();
	}

	async getOne(id) {
		return await LaptopModel.findById(id);
	}

	async createItem(dto, pictureUrl) {
		try {
			const doc = new LaptopModel({
				name: dto.name,
				price: dto.price,
				amount: dto.amount,
				characteristics: {
					screen: dto.screen,
					core: {
						coreName: dto.coreName,
						cores: dto.cores,
					},
					ram: dto.ram,
					storage: dto.storage,
					video_card: dto.video_card,
				},
				picture: pictureUrl,
			});
			const result = await doc.save();
			return result;
		} catch (err) {
			throw new Error("Error creating laptop: " + err.message);
		}
	}

	async updateAmount(name, amountChange) {
		try {
			const existLaptop = await this.findByName(name);
			if (!existLaptop) {
				throw new Error(`Laptop with name ${name} not found`);
			}

			const newAmount = existLaptop.amount + amountChange;
			if (newAmount < 0) {
				throw new Error(`Insufficient stock for ${name}`);
			}

			existLaptop.amount = newAmount;
			const saved = await existLaptop.save();
			return saved;
		} catch (error) {
			console.error("Error updating laptop amount:", error.message);
			throw new Error("Error updating laptop amount: " + error.message);
		}
	}

	async delete(id) {
		return await LaptopModel.findByIdAndDelete(id);
	}
}
