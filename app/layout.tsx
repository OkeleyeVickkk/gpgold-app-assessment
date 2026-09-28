import type { Metadata } from "next";
import { AppToaster } from "@/components/common/app-toaster";
import { OfflineToast } from "@/components/common/offline-toast";
import { DashboardShell } from "@/components/segments/dashboard-shell";
import { cabinetGrotesk, satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
	title: { default: "Product Dashboard", template: "%s | Product Dashboard" },
	description: "Internal dashboard for browsing and updating products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${cabinetGrotesk.variable} ${satoshi.variable} h-full antialiased`}>
			<body className="min-h-full" suppressHydrationWarning>
				<DashboardShell>{children}</DashboardShell>
				<AppToaster />
				<OfflineToast />
			</body>
		</html>
	);
}
