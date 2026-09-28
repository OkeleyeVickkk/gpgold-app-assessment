const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const wholeCurrencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const numberFormatter = new Intl.NumberFormat("en-US");

export function formatCurrency(amount: number) {
	return currencyFormatter.format(amount);
}

export function formatWholeCurrency(amount: number) {
	return wholeCurrencyFormatter.format(amount);
}

export function formatNumber(value: number) {
	return numberFormatter.format(value);
}

export function formatRating(rating: number) {
	return rating.toFixed(2);
}
