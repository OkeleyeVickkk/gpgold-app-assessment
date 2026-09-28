"use client";

import type React from "react";
import { useState } from "react";
import { twMerge } from "cn";
import { DashboardHeader } from "@/components/segments/dashboard-header";
import { DashboardSidebar } from "@/components/segments/dashboard-sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<div className="flex min-h-screen w-full">
			{isSidebarOpen && <div aria-hidden="true" className="fixed inset-0 z-30 bg-black/40 xl:hidden" onClick={closeSidebar} />}
			<aside
				id="dashboard-sidebar"
				onKeyDown={(event) => {
					if (event.key === "Escape") closeSidebar();
				}}
				className={twMerge(
					"fixed inset-y-0 left-0 z-40 w-72 border-r border-stone-100 bg-white transition-transform",
					isSidebarOpen ? "visible translate-x-0" : "invisible -translate-x-full xl:visible xl:translate-x-0",
				)}>
				<DashboardSidebar onClose={closeSidebar} />
			</aside>
			<div className="flex min-w-0 flex-1 flex-col xl:ml-72">
				<DashboardHeader isSidebarOpen={isSidebarOpen} onSidebarOpen={() => setIsSidebarOpen(true)} />
				<main className="flex-1 px-4 py-5">
					<div className="mx-auto w-full">{children}</div>
				</main>
			</div>
		</div>
	);
}
