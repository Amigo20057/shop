import TelephoneModel from "./model/Telephone.js";

export class TelephoneService {
	async findByName(name) {
		return await TelephoneModel.findOne({ name: name });
	}

	async findAll() {
		return await TelephoneModel.find();
	}

	async createItem(dto, pictureUrl) {
		try {
			const doc = new TelephoneModel({
				name: dto.name,
				price: dto.price,
				amount: dto.amount,
				characteristics: {
					screen: dto.screen,
					cores: dto.cores,
					power: dto.power,
					ram: dto.ram,
					rom: dto.rom,
					camera: dto.camera,
				},
				picture: pictureUrl,
			});

			const result = await doc.save();
			return result;
		} catch (error) {
			throw new Error("Error creating telephone: " + error.message);
		}
	}

	async updateAmount(dto) {
		try {
			const existingTelephone = await this.findByName(dto.name);

			if (!existingTelephone) {
				throw new Error(`Telephone with name ${dto.name} not found`);
			}

			const result = await TelephoneModel.updateOne(
				{ name: dto.name },
				{ $set: { amount: dto.amount } }
			);

			return result;
		} catch (error) {
			throw new Error("Error updating telephone amount: " + error.message);
		}
	}
}
