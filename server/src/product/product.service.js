import Phone from "./model/phone.model.js";
import Product from "./model/product.model.js";

export async function findProductById(productId) {
	return await Product.find({ _id: productId });
}

export async function findPhoneByName(name) {
	return await Phone.findOne({ name: name });
}

export async function findAllProductsByCategory(category, limit = null) {
	const queryOptions = {};
	if (limit) {
		queryOptions.limit = parseInt(limit);
	}
	return await Product.find({ type: `${category}` }, null, queryOptions);
}

export async function createPhone(phone) {
	const phoneExists = await findPhoneByName(phone.name);
	if (!phoneExists) {
		const doc = new Phone({
			name: phone.name,
			price: phone.price,
			description: phone.description,
			brand: phone.brand,
			ram: phone.ram,
			rom: phone.rom,
			battery: phone.battery,
			screen: phone.screen,
			cores: phone.cores,
			amount: phone.amount,
			picture: phone.picture,
			camera: phone.camera,
		});
		return await doc.save();
	} else {
		await Phone.updateOne({ _id: phoneExists._id }, { $inc: { amount: 1 } });
		return await Phone.findById(phoneExists._id);
	}
}

export async function filterPhones(query) {
	const { name, brand, ram, rom, battery } = query;
	let filter = {};
	if (name) filter.name = { $regex: name, $options: "i" };
	if (brand) filter.brand = brand;
	if (ram) filter.ram = ram;
	if (rom) filter.rom = rom;
	if (battery) filter.battery = battery;
	const phones = await Product.find(filter);
	return phones;
}
