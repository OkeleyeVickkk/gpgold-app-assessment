import { twMerge } from "cn";
import { CheckIcon } from "@/assets/resources/icons";
import { CustomButton } from "@/components/base/custom-button";

type PillButtonProps = {
	label: string;
	isActive: boolean;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	showCheckOnActive?: boolean;
};

export function CustomPillButton({ label, isActive, onClick, disabled, className, showCheckOnActive = false }: PillButtonProps) {
	return (
		<CustomButton
			onClick={onClick}
			disabled={disabled}
			aria-pressed={isActive}
			rightIcon={showCheckOnActive && isActive ? <CheckIcon /> : undefined}
			rightIconClassName="text-sm"
			className={twMerge(
				"active-scale flex items-center gap-x-1 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm leading-none font-medium select-none transition duration-300 ease-in-out disabled:border-gray-200 disabled:bg-gray-50",
				isActive
					? "border-primary bg-primary/10 text-primary"
					: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100/50 hover:text-gray-700",
				className,
			)}>
			{label}
		</CustomButton>
	);
}
