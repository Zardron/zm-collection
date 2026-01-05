import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--border)]/30 bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

