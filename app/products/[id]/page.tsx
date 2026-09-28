import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getProduct } from "@/api/product.api";
import { ProductDetails } from "@/components/segments/product-details";
import { buildListHref, parseListParams } from "@/lib/list-params";

function parseProductId(value: string) {
	const id = Number(value);
	return Number.isInteger(id) && id > 0 ? id : null;
}

async function loadProduct(idParam: string) {
	const id = parseProductId(idParam);
	return id === null ? null : getProduct(id);
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
	const product = await loadProduct((await params).id);
	return { title: product?.title ?? "Product not found" };
}

export default async function ProductDetailPage({ params, searchParams }: PageProps<"/products/[id]">) {
	const [{ id }, { from }] = await Promise.all([params, searchParams]);
	const [product, categories] = await Promise.all([loadProduct(id), getCategories()]);
	if (!product) notFound();

	const fromValue = Array.isArray(from) ? from[0] : from;
	const backHref = buildListHref(parseListParams(new URLSearchParams(fromValue ?? "")));
	const categoryName = categories.find((category) => category.slug === product.category)?.name ?? product.category;

	return <ProductDetails product={product} categoryName={categoryName} backHref={backHref} />;
}
