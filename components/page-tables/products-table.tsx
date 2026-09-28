import type React from "react";
import Link from "next/link";
import { IconWrapper, StarFilledIcon, VisibleIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { FigureImage } from "@/components/base/figure-image";
import { EditedPrice, EditedStockBadge } from "@/components/common/edited-value";
import { EntityTable, type EntityTableColumn, type EntityTablePagination } from "@/components/common/entity-table";
import { RatingStars } from "@/components/common/rating-stars";
import { SKELETON_ROW_COUNT } from "@/lib/constants";
import { formatRating } from "@/lib/format";
import { buildProductHref } from "@/lib/list-params";
import type { ListParams, ProductListItem } from "@/types/product.types";

type ProductsTableProps = {
	products: ProductListItem[];
	listParams: ListParams;
	categoryNames: Record<string, string>;
	firstSerialNumber?: number;
	caption?: string;
	header?: React.ReactNode;
	emptyState?: React.ReactNode;
	pagination?: EntityTablePagination;
	isLoading?: boolean;
	className?: string;
	compact?: boolean;
};

export function ProductsTable({
	products,
	listParams,
	categoryNames,
	firstSerialNumber = 1,
	caption = "Products",
	header,
	emptyState,
	pagination,
	isLoading,
	className,
	compact = false,
}: ProductsTableProps) {
	const categoryName = (product: ProductListItem) => categoryNames[product.category] ?? product.category;

	const columns: EntityTableColumn<ProductListItem>[] = [
		{ key: "serial", header: "S/N", cellClassName: "w-12 text-gray-500 tabular-nums", render: (_, index) => firstSerialNumber + index },
		{
			key: "product",
			header: "Product",
			render: (product) => (
				<div className="flex items-center gap-3">
					<FigureImage src={product.thumbnail} alt={product.title} sizes="44px" className="size-11 shrink-0 rounded-lg bg-gray-100" />
					<div className="min-w-0">
						<Link
							href={buildProductHref(product.id, listParams)}
							className="block max-w-56 truncate font-semibold text-slate-900 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
							{product.title}
						</Link>
						<span className="text-xs text-gray-500">
							{compact ? categoryName(product) : (product.brand ?? "No brand listed")}
						</span>
					</div>
				</div>
			),
		},
		...(compact
			? []
			: [
					{
						key: "category",
						header: "Category",
						cellClassName: "text-gray-600",
						render: categoryName,
					},
				]),
		{
			key: "price",
			header: "Price",
			cellClassName: "font-semibold text-slate-900",
			render: (product) => <EditedPrice productId={product.id} value={product.price} />,
		},
		{ key: "stock", header: "Stock", render: (product) => <EditedStockBadge productId={product.id} value={product.stock} /> },
		{
			key: "rating",
			header: "Rating",
			render: (product) =>
				compact ? (
					<span className="flex items-center gap-1 text-gray-600">
						<IconWrapper className="text-sm text-amber-500">
							<StarFilledIcon />
						</IconWrapper>
						{formatRating(product.rating)}
						<span className="sr-only"> out of 5</span>
					</span>
				) : (
					<span className="flex items-center gap-1.5 text-gray-600">
						<RatingStars rating={product.rating} />
						<span aria-hidden="true">{formatRating(product.rating)}</span>
					</span>
				),
		},
	];

	return (
		<EntityTable
			columns={columns}
			data={products}
			rowKey={(product) => String(product.id)}
			caption={caption}
			header={header}
			isLoading={isLoading}
			skeletonRows={SKELETON_ROW_COUNT}
			emptyState={emptyState}
			pagination={pagination}
			className={className}
			actionsHeader="View"
			renderRowActions={(product) => (
				<CustomButton
					as="link"
					href={buildProductHref(product.id, listParams)}
					aria-label={`View ${product.title}`}
					leftIcon={<VisibleIcon />}
					leftIconClassName="text-xl"
					className="mx-auto size-9 rounded-lg text-gray-600 hover:bg-primary/10 hover:text-primary"
				/>
			)}
		/>
	);
}
