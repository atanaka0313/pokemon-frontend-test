"use client";

import * as React from "react";
import QueryClientProvider from "#/context/QueryClientProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
