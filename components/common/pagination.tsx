import { twMerge } from "cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";

type PageItem = number | "gap";

function visiblePages(current: number, total: number): PageItem[] {
	const pages = [...new Set([1, current - 1, current, current + 1, total])]
		.filter((page) => page >= 1 && page <= total)
		.sort((first, second) => first - second);
	return pages.flatMap((page, index) => (index > 0 && page - pages[index - 1] > 1 ? ["gap" as const, page] : [page]));
}

const arrowStyle = "size-9 rounded-lg text-lg text-gray-600 hover:bg-gray-100 aria-disabled:opacity-40";
const pageStyle = "size-9 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	hrefForPage: (page: number) => string;
};

export function Pagination({ currentPage, totalPages, hrefForPage }: PaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1">
			<CustomButton
				as="link"
				href={hrefForPage(currentPage - 1)}
				disabled={currentPage <= 1}
				aria-label="Previous page"
				leftIcon={<ChevronLeftIcon />}
				className={arrowStyle}
			/>
			{visiblePages(currentPage, totalPages).map((item, index) =>
				item === "gap" ? (
					<span key={`gap-${index}`} aria-hidden="true" className="flex size-9 items-center justify-center text-gray-400">
						…
					</span>
				) : (
					<CustomButton
						key={item}
						as="link"
						href={hrefForPage(item)}
						aria-label={`Page ${item}`}
						aria-current={item === currentPage ? "page" : undefined}
						className={twMerge(pageStyle, item === currentPage && "bg-primary text-white hover:bg-primary-dark")}>
						{item}
					</CustomButton>
				),
			)}
			<CustomButton
				as="link"
				href={hrefForPage(currentPage + 1)}
				disabled={currentPage >= totalPages}
				aria-label="Next page"
				rightIcon={<ChevronRightIcon />}
				className={arrowStyle}
			/>
		</nav>
	);
}
