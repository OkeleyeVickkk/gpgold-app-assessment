import { z } from "zod";

export const productSchema = z.object({
	id: z.number().int().positive(),
	title: z.string(),
	description: z.string(),
	category: z.string(),
	brand: z.string().optional(),
	price: z.number(),
	stock: z.number().int(),
	rating: z.number(),
	thumbnail: z.string(),
	images: z.array(z.string()),
});

export const productListItemSchema = productSchema.pick({
	id: true,
	title: true,
	category: true,
	brand: true,
	price: true,
	stock: true,
	rating: true,
	thumbnail: true,
});

export const productListResponseSchema = z.object({
	products: z.array(productListItemSchema),
	total: z.number().int(),
	skip: z.number().int(),
	limit: z.number().int(),
});

export const metricsItemSchema = productSchema.pick({ id: true, category: true, price: true, stock: true, rating: true });

export const metricsResponseSchema = z.object({
	products: z.array(metricsItemSchema),
});

export const categorySchema = z.object({
	slug: z.string(),
	name: z.string(),
});

export const categoriesResponseSchema = z.array(categorySchema);

export const productEditFormSchema = z.object({
	price: z
		.number({ error: "Enter a price." })
		.positive("Price must be greater than 0.")
		.multipleOf(0.01, "Price can have at most two decimal places."),
	stock: z.number({ error: "Enter a stock quantity." }).int("Stock must be a whole number.").min(0, "Stock can't be negative."),
});

export const productEditSchema = productEditFormSchema.partial();

export const productEditsSchema = z.record(z.string(), productEditSchema);
