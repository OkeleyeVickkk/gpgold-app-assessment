import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS, SORT_FIELDS, SORT_OPTIONS, SORT_ORDERS } from "@/lib/constants";
import { _router } from "@/routes/routes";
import type { ListParams, PerPage, SortField, SortOrder } from "@/types/product.types";

type RawSearchParams = Record<string, string | string[] | undefined> | URLSearchParams;

function readParam(searchParams: RawSearchParams, key: string) {
	const value = searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
	const raw = Array.isArray(value) ? value[0] : value;
	return raw?.trim() || undefined;
}

function isSortField(value: string | undefined): value is SortField {
	return SORT_FIELDS.some((field) => field === value);
}

function isSortOrder(value: string | undefined): value is SortOrder {
	return SORT_ORDERS.some((order) => order === value);
}

function parsePage(value: string | undefined) {
	const page = Number(value);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

function parsePerPage(value: string | undefined): PerPage {
	return PER_PAGE_OPTIONS.find((option) => option === Number(value)) ?? DEFAULT_PER_PAGE;
}

export function parseListParams(searchParams: RawSearchParams, categorySlugs?: readonly string[]): ListParams {
	const category = readParam(searchParams, "category");
	const sort = readParam(searchParams, "sort");
	const order = readParam(searchParams, "order");

	return {
		query: readParam(searchParams, "query"),
		category: category && (!categorySlugs || categorySlugs.includes(category)) ? category : undefined,
		sort: isSortField(sort) ? sort : undefined,
		order: isSortField(sort) && isSortOrder(order) ? order : "asc",
		page: parsePage(readParam(searchParams, "page")),
		perPage: parsePerPage(readParam(searchParams, "perPage")),
	};
}

export function toListSearchParams({ query, category, sort, order, page, perPage }: ListParams) {
	const searchParams = new URLSearchParams();
	if (query) searchParams.set("query", query);
	if (category) searchParams.set("category", category);
	if (sort) {
		searchParams.set("sort", sort);
		searchParams.set("order", order);
	}
	if (page > 1) searchParams.set("page", String(page));
	if (perPage !== DEFAULT_PER_PAGE) searchParams.set("perPage", String(perPage));
	return searchParams;
}

export function buildListHref(params: ListParams, changes: Partial<ListParams> = {}) {
	const resetsPage = Object.keys(changes).some((key) => key !== "page");
	const next: ListParams = { ...params, ...(resetsPage ? { page: 1 } : {}), ...changes };
	const search = toListSearchParams(next).toString();
	return search ? `${_router.products.list.to}?${search}` : _router.products.list.to;
}

export function buildProductHref(id: number, listParams: ListParams) {
	const from = toListSearchParams(listParams).toString();
	const path = _router.products.details.to(id);
	return from ? `${path}?${new URLSearchParams({ from })}` : path;
}

export function getSortOption({ sort, order }: ListParams) {
	return SORT_OPTIONS.find((option) => option.sort === sort && option.order === order) ?? SORT_OPTIONS[0];
}

export const DEFAULT_LIST_PARAMS: ListParams = parseListParams(new URLSearchParams());

export function hasActiveFilters({ query, category }: ListParams) {
	return Boolean(query || category);
}
