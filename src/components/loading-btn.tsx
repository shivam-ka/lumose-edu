import * as React from "react";

import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loadingText?: string;
  loading: boolean;
}

export function LoadingButton({
  loadingText,
  loading,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? (
        <>
          <LoaderIcon className="animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
