import { EDITS_STORAGE_KEY } from "@/lib/constants";
import { productEditsSchema } from "@/schemas/product.schema";
import type { ProductEditInput, ProductEdits } from "@/types/product.types";

const EMPTY_EDITS: ProductEdits = {};
const listeners = new Set<() => void>();
let cachedEdits: ProductEdits | null = null;

function readStoredEdits(): ProductEdits {
	try {
		const stored = window.sessionStorage.getItem(EDITS_STORAGE_KEY);
		if (!stored) return EMPTY_EDITS;
		const parsed = productEditsSchema.safeParse(JSON.parse(stored));
		return parsed.success ? parsed.data : EMPTY_EDITS;
	} catch {
		return EMPTY_EDITS;
	}
}

export function getEditsSnapshot() {
	cachedEdits ??= readStoredEdits();
	return cachedEdits;
}

export function getServerEditsSnapshot() {
	return EMPTY_EDITS;
}

export function subscribeToEdits(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function saveProductEdit(productId: number, edit: ProductEditInput) {
	const currentEdits = getEditsSnapshot();
	cachedEdits = { ...currentEdits, [productId]: { ...currentEdits[productId], ...edit } };
	try {
		window.sessionStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(cachedEdits));
	} catch {}
	listeners.forEach((listener) => listener());
}

export function applyEdits<T extends { id: number; price: number; stock: number }>(product: T, edits: ProductEdits): T {
	const edit = edits[product.id];
	return edit ? { ...product, ...edit } : product;
}
