import { EmptyState } from "@/components/general/empty-state";
import { HomeIcon, SearchXIcon } from "lucide-react";

export default function Page() {
  return (
    <EmptyState
      icon={<SearchXIcon className="size-20" />}
      title="Page Not Found"
      description="Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist."
      linkHref="/"
      linkText="Home"
      buttonIcon={<HomeIcon className="size-4" />}
    />
  );
}
