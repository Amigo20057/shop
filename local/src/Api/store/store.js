import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
	persist(
		set => ({
			products: [],
			addToBasket: product =>
				set(state => {
					const existingProductIndex = state.products.findIndex(
						p => p._id === product._id
					);
					console.log(product);
					if (existingProductIndex !== -1) {
						const updatedProducts = [...state.products];
						updatedProducts[existingProductIndex].amount += 1;
						return { products: updatedProducts };
					} else {
						return { products: [...state.products, { ...product, amount: 1 }] };
					}
				}),
			decreaseAmount: productId =>
				set(state => {
					const productIndex = state.products.findIndex(
						p => p._id === productId
					);
					if (productIndex !== -1) {
						const updatedProducts = [...state.products];
						if (updatedProducts[productIndex].amount > 1) {
							updatedProducts[productIndex].amount -= 1;
						} else {
							updatedProducts.splice(productIndex, 1);
						}
						return { products: updatedProducts };
					}
					return state;
				}),
			clearBasket: () => {
				set(() => ({
					products: [],
				}));
			},
		}),
		{ name: "product-storage" }
	)
);

// export const AuthCheck = () => create((set)=>(

// ))
