"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      height={2}
      color="#ff6900"
      showSpinner={false}
      shadow="0 0 8px #ff6900,0 0 4px #ff6900"
    />
  );
}
