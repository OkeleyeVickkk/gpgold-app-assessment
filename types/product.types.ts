import type { z } from "zod";
import type { PER_PAGE_OPTIONS, SORT_FIELDS, SORT_ORDERS } from "@/lib/constants";
import type {
	categorySchema,
	metricsItemSchema,
	productEditSchema,
	productEditsSchema,
	productListItemSchema,
	productSchema,
} from "@/schemas/product.schema";

export type Product = z.infer<typeof productSchema>;
export type ProductListItem = z.infer<typeof productListItemSchema>;
export type MetricsItem = z.infer<typeof metricsItemSchema>;
export type Category = z.infer<typeof categorySchema>;

export type SortField = (typeof SORT_FIELDS)[number];
export type SortOrder = (typeof SORT_ORDERS)[number];
export type PerPage = (typeof PER_PAGE_OPTIONS)[number];

export type ListParams = {
	query?: string;
	category?: string;
	sort?: SortField;
	order: SortOrder;
	page: number;
	perPage: PerPage;
};

export type ProductListResult = {
	products: ProductListItem[];
	total: number;
	page: number;
	perPage: PerPage;
	pageCount: number;
};

export type ProductEditInput = z.infer<typeof productEditSchema>;
export type ProductEditFieldErrors = Partial<Record<keyof ProductEditInput, string[]>>;
export type ProductEdits = z.infer<typeof productEditsSchema>;

export type UpdateProductResult =
	{ ok: true; product: Pick<Product, "id" | "price" | "stock"> } | { ok: false; message: string; fieldErrors?: ProductEditFieldErrors };
