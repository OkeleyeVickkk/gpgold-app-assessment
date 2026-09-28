import type React from "react";
import { twMerge } from "cn";
import { CustomCard } from "@/components/base/custom-card";
import { Pagination } from "@/components/common/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";

export type EntityTableColumn<T> = {
	key: string;
	header: string;
	headerClassName?: string;
	cellClassName?: string;
	render: (row: T, index: number) => React.ReactNode;
};

export type EntityTablePagination = {
	page: number;
	pageCount: number;
	pageSize: number;
	totalItems: number;
	hrefForPage: (page: number) => string;
	pageSizeControl?: React.ReactNode;
};

type EntityTableProps<T> = {
	columns: EntityTableColumn<T>[];
	data: T[];
	rowKey: (row: T) => string;
	caption: string;
	header?: React.ReactNode;
	toolbar?: React.ReactNode;
	renderRowActions?: (row: T) => React.ReactNode;
	actionsHeader?: string;
	isLoading?: boolean;
	skeletonRows?: number;
	emptyState?: React.ReactNode;
	pagination?: EntityTablePagination;
	className?: string;
};

export function EntityTable<T>({
	columns,
	data,
	rowKey,
	caption,
	header,
	toolbar,
	renderRowActions,
	actionsHeader = "Actions",
	isLoading = false,
	skeletonRows = 5,
	emptyState,
	pagination,
	className,
}: EntityTableProps<T>) {
	const isEmpty = !isLoading && data.length === 0;
	const colSpan = columns.length + (renderRowActions ? 1 : 0);

	return (
		<CustomCard className={twMerge("rounded-xl border-gray-200/70", className)}>
			{header && <div className="px-4 pt-4 sm:px-5">{header}</div>}
			{toolbar && <div className="sticky top-17 z-10 rounded-t-xl border-b border-gray-100 bg-white px-4 py-3 sm:px-5">{toolbar}</div>}
			<Table className="min-w-160">
				<caption className="sr-only">{caption}</caption>
				{!isEmpty && (
					<TableHeader>
						<TableRow className="bg-layout-paint text-sm text-gray-500 hover:bg-layout-paint">
							{columns.map((column) => (
								<TableHead key={column.key} className={twMerge("h-11 px-4 text-gray-500 first:pl-5", column.headerClassName)}>
									{column.header}
								</TableHead>
							))}
							{renderRowActions && <TableHead className="px-4 text-center text-gray-500">{actionsHeader}</TableHead>}
						</TableRow>
					</TableHeader>
				)}
				<TableBody>
					{isLoading &&
						Array.from({ length: skeletonRows }, (_, rowIndex) => (
							<TableRow key={`skeleton-${rowIndex}`}>
								{columns.map((column) => (
									<TableCell key={column.key} className={twMerge("px-4 py-4 first:pl-5", column.cellClassName)}>
										<Skeleton className="h-4 w-3/4" />
									</TableCell>
								))}
								{renderRowActions && (
									<TableCell className="px-4">
										<Skeleton className="mx-auto h-8 w-16 rounded-lg" />
									</TableCell>
								)}
							</TableRow>
						))}

					{isEmpty && (
						<TableRow className="hover:bg-transparent">
							<TableCell colSpan={Math.max(colSpan, 1)} className="p-0 whitespace-normal">
								{emptyState}
							</TableCell>
						</TableRow>
					)}

					{!isLoading &&
						data.map((row, index) => (
							<TableRow key={rowKey(row)} className="text-sm font-medium">
								{columns.map((column) => (
									<TableCell key={column.key} className={twMerge("px-4 py-3 first:pl-5", column.cellClassName)}>
										{column.render(row, index)}
									</TableCell>
								))}
								{renderRowActions && <TableCell className="px-4 text-center">{renderRowActions(row)}</TableCell>}
							</TableRow>
						))}
				</TableBody>
			</Table>
			{pagination && !isEmpty && <EntityTableFooter {...pagination} itemCount={data.length} isLoading={isLoading} />}
		</CustomCard>
	);
}

function EntityTableFooter({
	page,
	pageCount,
	pageSize,
	totalItems,
	hrefForPage,
	pageSizeControl,
	itemCount,
	isLoading,
}: EntityTablePagination & { itemCount: number; isLoading: boolean }) {
	const firstItem = (page - 1) * pageSize + 1;
	const lastItem = firstItem + itemCount - 1;

	return (
		<div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
			<div className="flex flex-wrap justify-center items-center gap-3 sm:justify-start">
				{isLoading ? (
					<Skeleton className="h-4 w-32" />
				) : (
					<span className="font-medium">
						Showing {formatNumber(firstItem)}-{formatNumber(lastItem)} of {formatNumber(totalItems)}
					</span>
				)}
				{pageSizeControl}
			</div>
			{!isLoading && <Pagination currentPage={page} totalPages={pageCount} hrefForPage={hrefForPage} />}
		</div>
	);
}
