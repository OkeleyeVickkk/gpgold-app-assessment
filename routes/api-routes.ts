const PRODUCTS = "/products";

export const _api = {
	products: {
		list: PRODUCTS,
		search: `${PRODUCTS}/search`,
		byCategory: (categorySlug: string) => `${PRODUCTS}/category/${encodeURIComponent(categorySlug)}`,
		categories: `${PRODUCTS}/categories`,
		get: (id: number) => `${PRODUCTS}/${id}`,
		update: (id: number) => `${PRODUCTS}/${id}`,
	},
};
