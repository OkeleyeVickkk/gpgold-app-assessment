import type { ReactNode } from "react";
import { TOAST_DURATION_MS } from "@/lib/constants";
import { toast as sonnerToast } from "sonner";
import { CustomToast, type ToastAction, type ToastVariant } from "@/components/base/custom-toast";

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

export interface ToastOptions {
	id?: string | number;
	title: string;
	description?: string;
	duration?: number;
	icon?: ReactNode;
	position?: ToastPosition;
	action?: ToastAction;
	showProgress?: boolean;
	defaultExpanded?: boolean;
	showChevron?: boolean;
	showCloseButton?: boolean;
}

interface ToastApi {
	success: (options: ToastOptions) => string | number;
	error: (options: ToastOptions) => string | number;
	warning: (options: ToastOptions) => string | number;
	info: (options: ToastOptions) => string | number;
	primary: (options: ToastOptions) => string | number;
	custom: (variant: ToastVariant, options: ToastOptions) => string | number;
	dismiss: (id?: string | number) => void;
	promise: <T>(
		promise: Promise<T>,
		options: { loading: string | ToastOptions; success: string | ToastOptions; error: string | ToastOptions },
	) => Promise<T>;
}

function showToast(
	variant: ToastVariant,
	{
		id,
		title,
		description,
		duration = TOAST_DURATION_MS,
		icon,
		showProgress,
		position,
		action,
		defaultExpanded,
		showChevron,
		showCloseButton,
	}: ToastOptions,
): string | number {
	return sonnerToast.custom(
		(idFromSonner) => (
			<CustomToast
				id={idFromSonner}
				variant={variant}
				title={title}
				description={description}
				duration={duration}
				icon={icon}
				action={action}
				showProgress={showProgress}
				defaultExpanded={defaultExpanded}
				showChevron={showChevron}
				showCloseButton={showCloseButton}
			/>
		),
		{
			id,
			duration: Infinity,
			position,
		},
	);
}

export const toast: ToastApi = {
	success: (options) => showToast("success", options),
	error: (options) => showToast("error", options),
	warning: (options) => showToast("warning", options),
	info: (options) => showToast("info", options),
	custom: (variant, options) => showToast(variant, options),
	primary: (options) => showToast("primary", options),
	dismiss: (id) => sonnerToast.dismiss(id),
	promise: async <T,>(
		promise: Promise<T>,
		{ loading, success, error }: { loading: string | ToastOptions; success: string | ToastOptions; error: string | ToastOptions },
	): Promise<T> => {
		const loadingOptions = typeof loading === "string" ? { title: loading } : loading;
		const id = showToast("info", { ...loadingOptions, duration: Infinity });

		try {
			const result = await promise;
			const successOptions = typeof success === "string" ? { title: success } : success;
			sonnerToast.dismiss(id);
			showToast("success", { ...successOptions, duration: TOAST_DURATION_MS });
			return result;
		} catch (caughtError) {
			const errorOptions = typeof error === "string" ? { title: error } : error;
			sonnerToast.dismiss(id);
			showToast("error", { ...errorOptions, duration: TOAST_DURATION_MS });
			throw caughtError;
		}
	},
};
