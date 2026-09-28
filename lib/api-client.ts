import "server-only";
import type { z } from "zod";
import { ApiError } from "@/lib/api-error";
import { DUMMYJSON_BASE_URL } from "@/lib/constants";

type ApiFetchOptions = {
	searchParams?: Record<string, string | number | undefined>;
	revalidate?: number;
	method?: "GET" | "PATCH";
	body?: unknown;
};

async function readErrorMessage(response: Response) {
	try {
		const data: unknown = await response.json();
		if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") return data.message;
	} catch {}
	return response.statusText || "Request failed";
}

export async function apiFetch<TSchema extends z.ZodType>(
	path: string,
	schema: TSchema,
	{ searchParams = {}, revalidate = 60, method = "GET", body }: ApiFetchOptions = {},
): Promise<z.infer<TSchema>> {
	const url = new URL(path, DUMMYJSON_BASE_URL);
	for (const [key, value] of Object.entries(searchParams)) {
		if (value !== undefined) url.searchParams.set(key, String(value));
	}

	let response: Response;
	try {
		response = await fetch(url, {
			method,
			headers: body === undefined ? undefined : { "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
			...(method === "GET" ? { next: { revalidate } } : { cache: "no-store" }),
		});
	} catch {
		throw new ApiError(503, "Could not reach the product service.");
	}

	if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response));

	const parsed = schema.safeParse(await response.json());
	if (!parsed.success) throw new ApiError(502, "The product service returned data in an unexpected shape.");
	return parsed.data;
}
