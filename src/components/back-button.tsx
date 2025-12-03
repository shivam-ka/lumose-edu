"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react";

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <Button asChild variant="outline" size="icon" className="group">
      <Link href={href}>
        <IconArrowNarrowLeftDashed className="size-5 transition-all group-active:scale-90 md:size-6" />
      </Link>
    </Button>
  );
}
