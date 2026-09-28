"use server";

import { z } from "zod";
import { updateProduct } from "@/api/product.api";
import { ApiError } from "@/lib/api-error";
import { productEditSchema } from "@/schemas/product.schema";
import type { ProductEditInput, UpdateProductResult } from "@/types/product.types";

const productIdSchema = z.number().int().positive();

export async function updateProductAction(id: number, input: ProductEditInput): Promise<UpdateProductResult> {
	const parsedId = productIdSchema.safeParse(id);
	const parsedInput = productEditSchema.safeParse(input);

	if (!parsedId.success) return { ok: false, message: "This product id is not valid. Nothing was saved." };
	if (!parsedInput.success) {
		return { ok: false, message: "Some values are not valid. Nothing was saved.", fieldErrors: z.flattenError(parsedInput.error).fieldErrors };
	}
	if (Object.keys(parsedInput.data).length === 0) return { ok: false, message: "There were no changes to save." };

	try {
		const product = await updateProduct(parsedId.data, parsedInput.data);
		return { ok: true, product: { id: product.id, price: product.price, stock: product.stock } };
	} catch (error) {
		const reason = error instanceof ApiError ? error.message : "Something went wrong.";
		return { ok: false, message: `Couldn't save your changes: ${reason} Nothing was saved.` };
	}
}
