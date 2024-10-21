import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
	persist(
		set => ({
			products: [],
			count: 0,
			addToBasket: product =>
				set(state => ({ products: [...state.products, product] })),
			removeFromBasket: productId =>
				set(state => ({
					products: state.products.filter(p => p.id !== productId),
				})),
		}),
		{ name: "product-storage" }
	)
);

// export const AuthCheck = () => create((set)=>(

// ))
