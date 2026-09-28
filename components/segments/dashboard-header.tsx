"use client";

import { twMerge } from "cn";
import { IconWrapper, MobileMenuIcon, ProductContainerIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { UserAccountMenu } from "@/components/common/user-account-menu";
import { useOnlineStatus } from "@/hooks/common/use-online-status";
import { DEMO_USER } from "@/lib/constants";
import { _router } from "@/routes/routes";

type DashboardHeaderProps = {
	isSidebarOpen: boolean;
	onSidebarOpen: () => void;
};

export function DashboardHeader({ isSidebarOpen, onSidebarOpen }: DashboardHeaderProps) {
	const isOnline = useOnlineStatus();

	return (
		<header className="sticky top-0 z-20 h-17 border-b border-stone-100 bg-white px-4 md:px-6">
			<div className="flex h-full items-center justify-between gap-3">
				<CustomButton as="link" href={_router.dashboard.to} aria-label="Product Dashboard home" className="xl:hidden">
					<IconWrapper className="size-9 rounded-lg bg-primary text-lg text-white">
						<ProductContainerIcon />
					</IconWrapper>
				</CustomButton>
				<div className="ml-auto flex items-center gap-2.5 sm:gap-3">
					<span
						className={twMerge(
							"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
							isOnline ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
						)}>
						<span aria-hidden="true" className={twMerge("size-2 rounded-full", isOnline ? "bg-emerald-500" : "bg-red-500")} />
						{isOnline ? "Online" : "Offline"}
					</span>
					<span aria-hidden="true" className="h-8 w-px bg-gray-100" />
					<UserAccountMenu name={DEMO_USER.name} email={DEMO_USER.email} />
					<CustomButton
						aria-label="Open navigation"
						aria-expanded={isSidebarOpen}
						aria-controls="dashboard-sidebar"
						onClick={onSidebarOpen}
						rightIcon={<MobileMenuIcon />}
						rightIconClassName="text-2xl"
						className="active-scale rounded-lg bg-primary p-1.5 text-white ring-1 ring-primary ring-offset-1 hover:bg-primary-dark xl:hidden"
					/>
				</div>
			</div>
		</header>
	);
}
