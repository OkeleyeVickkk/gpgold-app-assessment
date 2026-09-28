import { HomeIcon, ProductContainerIcon } from "@/assets/resources/icons";
import { _router } from "@/routes/routes";

export const DUMMYJSON_BASE_URL = process.env.DUMMYJSON_BASE_URL ?? "https://dummyjson.com";

export const PER_PAGE_OPTIONS = [25, 50, 100] as const;
export const DEFAULT_PER_PAGE = 25;
export const SKELETON_ROW_COUNT = 8;
export const LOW_STOCK_PREVIEW_COUNT = 7;
export const METRIC_CARD_COUNT = 4;
export const CHART_CATEGORY_LIMIT = 6;
export const OFFLINE_TOAST_ID = "app-offline-toast";
export const TOAST_DURATION_MS = 4000;
export const SEARCH_DEBOUNCE_MS = 300;
export const LOW_STOCK_THRESHOLD = 10;
export const EDITS_STORAGE_KEY = "product-edits";

export const SORT_FIELDS = ["title", "price", "rating", "stock"] as const;
export const SORT_ORDERS = ["asc", "desc"] as const;

export const DEFAULT_SORT_VALUE = "default";

export const SORT_OPTIONS = [
	{ value: DEFAULT_SORT_VALUE, label: "Default order", sort: undefined, order: "asc" },
	{ value: "title-asc", label: "Title: A to Z", sort: "title", order: "asc" },
	{ value: "title-desc", label: "Title: Z to A", sort: "title", order: "desc" },
	{ value: "price-asc", label: "Price: low to high", sort: "price", order: "asc" },
	{ value: "price-desc", label: "Price: high to low", sort: "price", order: "desc" },
	{ value: "rating-desc", label: "Rating: high to low", sort: "rating", order: "desc" },
	{ value: "stock-asc", label: "Stock: low to high", sort: "stock", order: "asc" },
] as const;

export const REVALIDATE_SECONDS = {
	categories: 60 * 60 * 24,
	productList: 60,
	metrics: 60 * 5,
	productDetails: 60,
} as const;

export const PRODUCT_LIST_FIELDS = "title,category,brand,price,stock,rating,thumbnail";
export const METRICS_FIELDS = "category,price,stock,rating";

export const NAV_ITEMS = [
	{ label: "Overview", href: _router.dashboard.to, icon: HomeIcon },
	{ label: "Products", href: _router.products.list.to, icon: ProductContainerIcon },
] as const;

export const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
	"var(--color-amber-500)",
	"var(--color-slate-400)",
] as const;

export const DEMO_USER = { name: "Catalogue Admin", email: "admin@example.com" } as const;
