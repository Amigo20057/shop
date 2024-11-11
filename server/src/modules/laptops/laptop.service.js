import LaptopModel from "./model/Laptop.js";

export class LaptopService {
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

	async updateAmount(name, amount) {
		//
	}

	async delete(id) {
		return await LaptopModel.findByIdAndDelete(id);
	}
}
