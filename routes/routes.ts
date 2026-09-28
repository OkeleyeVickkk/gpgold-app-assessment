const PRODUCTS = "/products";

export const _router = {
	dashboard: {
		to: "/",
	},
	products: {
		list: {
			to: PRODUCTS,
		},
		details: {
			to: (id: number) => `${PRODUCTS}/${id}`,
		},
	},
};
