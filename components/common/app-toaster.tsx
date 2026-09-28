import { Toaster } from "sonner";
import { TOAST_DURATION_MS } from "@/lib/constants";

export function AppToaster() {
	return (
		<Toaster
			position="top-right"
			richColors={false}
			expand={true}
			closeButton={false}
			visibleToasts={2}
			mobileOffset={{ top: 20, left: -20, right: 0 }}
			style={{ fontFamily: "var(--font-sans)" }}
			toastOptions={{
				className: "!border-0 !shadow-none !bg-transparent !p-0 ml-auto max-sm:max-w-sm! max-[500px]:w-[90%]! w-full",
				duration: TOAST_DURATION_MS,
			}}
		/>
	);
}
