"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";


export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client for each request to avoid sharing state
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
    
  );
}