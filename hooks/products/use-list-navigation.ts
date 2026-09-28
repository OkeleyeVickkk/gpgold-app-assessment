"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { buildListHref } from "@/lib/list-params";
import type { ListParams } from "@/types/product.types";

export function useListNavigation(listParams: ListParams) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function navigate(changes: Partial<ListParams>, { replace = false } = {}) {
		const href = buildListHref(listParams, changes);
		startTransition(() => {
			if (replace) router.replace(href, { scroll: false });
			else router.push(href, { scroll: false });
		});
	}

	return { navigate, isPending };
}
