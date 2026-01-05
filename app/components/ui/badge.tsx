import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-[var(--primary-black)]",
        secondary:
          "bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)]/30",
        destructive:
          "bg-red-600/20 text-red-400 border border-red-600/30",
        success:
          "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30",
        warning:
          "bg-amber-600/20 text-amber-400 border border-amber-600/30",
        outline:
          "border border-[var(--border)] text-[var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

