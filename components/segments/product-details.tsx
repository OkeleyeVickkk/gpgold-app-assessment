import { ArrowLeftIcon } from "@/assets/resources/icons";
import { CustomBadge } from "@/components/base/custom-badge";
import { CustomButton } from "@/components/base/custom-button";
import { CustomCard } from "@/components/base/custom-card";
import { FigureImage } from "@/components/base/figure-image";
import { RatingStars } from "@/components/common/rating-stars";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { ProductPricingCard } from "@/components/segments/product-pricing-card";
import { formatRating } from "@/lib/format";
import type { Product } from "@/types/product.types";

type ProductDetailsProps = {
	product: Product;
	categoryName: string;
	backHref: string;
};

export function ProductDetails({ product, categoryName, backHref }: ProductDetailsProps) {
	return (
		<div className="space-y-6">
			<CustomButton
				as="link"
				href={backHref}
				leftIcon={<ArrowLeftIcon />}
				className="w-fit text-sm font-semibold text-slate-600 hover:text-primary">
				Back to products
			</CustomButton>

			<article className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
				<CustomCard className="rounded-xl border-gray-200/70 bg-white overflow-hidden">
					<FigureImage
						src={product.images[0] ?? product.thumbnail}
						alt={product.title}
						sizes="(min-width: 1024px) 40vw, 100vw"
						loading="eager"
						className="aspect-square w-full rounded-lg bg-layout-paint"
						imgClassName="object-contain"
					/>
				</CustomCard>

				<div className="space-y-6">
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							<CustomBadge variant="primary" size="sm" label={categoryName} />
							<CustomBadge variant="neutral" size="sm" label={product.brand ?? "No brand listed"} />
						</div>
						<TitleSubtitle as="h1" title={product.title} className="max-w-none" titleClassName="text-2xl font-bold sm:text-3xl" />
						<p className="flex items-center gap-2 text-sm font-medium text-slate-600">
							<RatingStars rating={product.rating} className="text-base" />
							<span aria-hidden="true">{formatRating(product.rating)} out of 5</span>
						</p>
					</div>

					<TitleSubtitle
						title="Description"
						subtitle={product.description}
						className="max-w-none space-y-1"
						titleClassName="text-lg"
						subtitleClassName="text-base font-medium leading-relaxed text-slate-600"
					/>
					<ProductPricingCard product={{ id: product.id, title: product.title, price: product.price, stock: product.stock }} />
				</div>
			</article>
		</div>
	);
}
