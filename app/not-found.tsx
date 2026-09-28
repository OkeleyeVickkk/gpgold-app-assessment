import { EmptyProductIcon } from "@/assets/resources/icons";
import { CustomCard } from "@/components/base/custom-card";
import { EmptyStateUI } from "@/components/common/status-state-ui";
import { _router } from "@/routes/routes";

export default function NotFound() {
	return (
		<CustomCard>
			<EmptyStateUI
				className="py-16"
				title="Page not found"
				description="The page you are looking for doesn't exist."
				icon={<EmptyProductIcon />}
				action={{ as: "link", href: _router.dashboard.to, children: "Go to overview" }}
			/>
		</CustomCard>
	);
}
