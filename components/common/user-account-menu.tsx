"use client";

import { ChevronDownIcon, LogoutIcon, ProfileIcon } from "@/assets/resources/icons";
import { CustomAvatar } from "@/components/base/custom-avatar";
import { CustomButton } from "@/components/base/custom-button";
import { CustomDropdown } from "@/components/base/custom-dropdown";
import { TitleSubtitle } from "@/components/common/title-subtitle";
import { toast } from "@/configs/toast";

type UserAccountMenuProps = {
	name: string;
	email: string;
};

function showAccountsUnavailable() {
	toast.info({
		title: "Accounts are not part of this demo",
		description: "The dashboard has no sign-in, so there is no profile or session to manage.",
	});
}

export function UserAccountMenu({ name, email }: UserAccountMenuProps) {
	return (
		<CustomDropdown
			align="center"
			trigger={
				<CustomButton
					aria-label={`Account menu for ${name}`}
					rightIcon={<ChevronDownIcon />}
					rightIconClassName="hidden text-base text-gray-500 md:flex"
					className="gap-2 rounded-full p-0.5 hover:bg-gray-50 md:py-1 md:pr-2 md:pl-1">
					<CustomAvatar name={name} size="md" />
					<TitleSubtitle
						title={name}
						subtitle={email}
						as="h3"
						className="hidden text-start md:block"
						titleClassName="max-w-32 truncate text-sm leading-tight"
						subtitleClassName="max-w-32 truncate text-xs leading-tight font-normal"
					/>
				</CustomButton>
			}
			entries={[
				{
					type: "label",
					content: (
						<span className="flex flex-col">
							<span className="text-sm font-semibold text-slate-900">{name}</span>
							<span className="text-xs font-normal text-slate-500">{email}</span>
						</span>
					),
				},
				{ label: "Profile", icon: <ProfileIcon />, onClick: showAccountsUnavailable },
				{ type: "separator" },
				{ label: "Logout", icon: <LogoutIcon />, variant: "destructive", onClick: showAccountsUnavailable },
			]}
		/>
	);
}
