"use client";

import type React from "react";
import { useRef, useState } from "react";
import { z } from "zod";
import { CustomInput } from "@/components/base/custom-input";
import { productEditFormSchema } from "@/schemas/product.schema";
import type { ProductEditFieldErrors, ProductEditInput } from "@/types/product.types";

export const EDIT_PRODUCT_FORM_ID = "edit-product-form";

type EditProductFormProps = {
	initialValues: Required<ProductEditInput>;
	serverFieldErrors?: ProductEditFieldErrors;
	serverError?: string;
	disabled?: boolean;
	onSubmit: (values: Required<ProductEditInput>) => void;
};

function toNumber(value: string) {
	return value.trim() === "" ? Number.NaN : Number(value);
}

export function EditProductForm({ initialValues, serverFieldErrors, serverError, disabled, onSubmit }: EditProductFormProps) {
	const [priceInput, setPriceInput] = useState(String(initialValues.price));
	const [stockInput, setStockInput] = useState(String(initialValues.stock));
	const [clientFieldErrors, setClientFieldErrors] = useState<ProductEditFieldErrors>({});
	const priceInputRef = useRef<HTMLInputElement>(null);
	const stockInputRef = useRef<HTMLInputElement>(null);
	const fieldErrors = { ...serverFieldErrors, ...clientFieldErrors };

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const parsed = productEditFormSchema.safeParse({ price: toNumber(priceInput), stock: toNumber(stockInput) });

		if (!parsed.success) {
			const errors = z.flattenError(parsed.error).fieldErrors;
			setClientFieldErrors(errors);
			if (errors.price) priceInputRef.current?.focus();
			else if (errors.stock) stockInputRef.current?.focus();
			return;
		}

		setClientFieldErrors({});
		onSubmit(parsed.data);
	}

	return (
		<form id={EDIT_PRODUCT_FORM_ID} onSubmit={handleSubmit} noValidate className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<CustomInput
					ref={priceInputRef}
					id="price"
					label="Price (USD)"
					type="number"
					inputMode="decimal"
					step="0.01"
					min="0"
					value={priceInput}
					onChange={(event) => setPriceInput(event.target.value)}
					error={fieldErrors.price?.[0]}
					disabled={disabled}
					labelClassName="text-sm sm:text-sm"
				/>
				<CustomInput
					ref={stockInputRef}
					id="stock"
					label="Stock"
					type="number"
					inputMode="numeric"
					step="1"
					min="0"
					value={stockInput}
					onChange={(event) => setStockInput(event.target.value)}
					error={fieldErrors.stock?.[0]}
					disabled={disabled}
					labelClassName="text-sm sm:text-sm"
				/>
			</div>
			<p className="text-xs text-slate-500">
				Only changed fields are sent. The demo API does not store updates, so saved values are kept in this browser tab.
			</p>
			<div role="alert" className="text-sm font-medium text-red-600 empty:hidden">
				{serverError}
			</div>
		</form>
	);
}
