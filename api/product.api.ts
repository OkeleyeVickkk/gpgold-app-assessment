import "server-only";
import { apiFetch } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { LOW_STOCK_PREVIEW_COUNT, METRICS_FIELDS, PRODUCT_LIST_FIELDS, REVALIDATE_SECONDS } from "@/lib/constants";
import { _api } from "@/routes/api-routes";
import { categoriesResponseSchema, metricsResponseSchema, productListResponseSchema, productSchema } from "@/schemas/product.schema";
import type { ListParams, PerPage, Product, ProductListItem, ProductListResult } from "@/types/product.types";

function countPages(total: number, perPage: PerPage) {
	return Math.max(1, Math.ceil(total / perPage));
}

function toListResult(products: ProductListItem[], total: number, page: number, perPage: PerPage): ProductListResult {
	return { products, total, page, perPage, pageCount: countPages(total, perPage) };
}

function listPath({ query, category }: ListParams) {
	if (query) return _api.products.search;
	if (category) return _api.products.byCategory(category);
	return _api.products.list;
}

export async function getProducts(params: ListParams): Promise<ProductListResult> {
	const { query, category, sort, order, page, perPage } = params;
	const sortParams = sort ? { sortBy: sort, order } : {};

	if (query && category) {
		const data = await apiFetch(_api.products.search, productListResponseSchema, {
			searchParams: { q: query, limit: 0, select: PRODUCT_LIST_FIELDS, ...sortParams },
			revalidate: REVALIDATE_SECONDS.productList,
		});
		const matches = data.products.filter((product) => product.category === category);
		const clampedPage = Math.min(page, countPages(matches.length, perPage));
		const start = (clampedPage - 1) * perPage;
		return toListResult(matches.slice(start, start + perPage), matches.length, clampedPage, perPage);
	}

	const data = await apiFetch(listPath(params), productListResponseSchema, {
		searchParams: { q: query, limit: perPage, skip: (page - 1) * perPage, select: PRODUCT_LIST_FIELDS, ...sortParams },
		revalidate: REVALIDATE_SECONDS.productList,
	});
	const result = toListResult(data.products, data.total, page, perPage);

	return page > result.pageCount ? getProducts({ ...params, page: result.pageCount }) : result;
}

export async function getProduct(id: number): Promise<Product | null> {
	try {
		return await apiFetch(_api.products.get(id), productSchema, { revalidate: REVALIDATE_SECONDS.productDetails });
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) return null;
		throw error;
	}
}

export async function getCategories() {
	return apiFetch(_api.products.categories, categoriesResponseSchema, { revalidate: REVALIDATE_SECONDS.categories });
}

export async function getAllProductsForMetrics() {
	const data = await apiFetch(_api.products.list, metricsResponseSchema, {
		searchParams: { limit: 0, select: METRICS_FIELDS },
		revalidate: REVALIDATE_SECONDS.metrics,
	});
	return data.products;
}

export async function getLowestStockProducts() {
	const data = await apiFetch(_api.products.list, productListResponseSchema, {
		searchParams: { limit: LOW_STOCK_PREVIEW_COUNT, sortBy: "stock", order: "asc", select: PRODUCT_LIST_FIELDS },
		revalidate: REVALIDATE_SECONDS.productList,
	});
	return data.products;
}

export async function updateProduct(id: number, input: Partial<Pick<Product, "price" | "stock">>) {
	return apiFetch(_api.products.update(id), productSchema, { method: "PATCH", body: input });
}
