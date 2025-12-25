"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  icon?: ReactNode;
  buttonIcon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Nothing found",
  description,
  linkText,
  linkHref,
  icon,
  buttonIcon,
  className,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col items-center justify-center space-y-2 text-center",
        className,
      )}
    >
      {icon}
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      <p className="text-muted-foreground max-w-md px-4 text-base sm:text-lg">
        {description}
      </p>
      <div className="mt-2 flex gap-5">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft /> Go Back
        </Button>
        {linkHref && (
          <Button asChild>
            <Link href={linkHref}>
              {buttonIcon && buttonIcon}
              {linkText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
