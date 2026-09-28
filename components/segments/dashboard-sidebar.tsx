"use client";

import { twMerge } from "cn";
import { CloseIcon, IconWrapper, ProductContainerIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";
import { NAV_ITEMS } from "@/lib/constants";
import { _router } from "@/routes/routes";

const navItemStyle =
	"relative w-full justify-start gap-x-2 rounded-r-sm px-4 py-2.5 font-medium text-gray-600 before:absolute before:w-0.5 hover:text-gray-700 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";
const activeNavItemStyle = "bg-primary/10 text-primary hover:text-primary before:inset-y-0 before:left-0 before:h-full before:bg-primary";

export function DashboardSidebar({ onClose }: { onClose: () => void }) {
	return (
		<div className="flex h-full flex-col">
			<div className="flex min-h-17 items-center justify-between border-b border-gray-100 px-4 sm:px-5">
				<CustomButton as="link" href={_router.dashboard.to} onClick={onClose} className="gap-2 font-heading text-lg font-bold text-slate-900">
					<IconWrapper className="size-8 rounded-lg bg-primary text-lg text-white">
						<ProductContainerIcon />
					</IconWrapper>
					Product Dashboard
				</CustomButton>
				<CustomButton
					aria-label="Close navigation"
					onClick={onClose}
					rightIcon={<CloseIcon />}
					rightIconClassName="text-2xl"
					className="active-scale rounded-lg bg-primary p-1.5 text-white ring-1 ring-primary ring-offset-1 hover:bg-primary-dark xl:hidden"
				/>
			</div>
			<nav aria-label="Main" className="grow overflow-y-auto py-4 px-4">
				<ul className="flex flex-col space-y-0.5">
					{NAV_ITEMS.map((item) => (
						<li key={item.href}>
							<CustomButton
								as="navlink"
								href={item.href}
								onClick={onClose}
								leftIcon={<item.icon />}
								leftIconClassName="text-xl"
								className={({ isActive }) => twMerge(navItemStyle, isActive && activeNavItemStyle)}>
								{item.label}
							</CustomButton>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
