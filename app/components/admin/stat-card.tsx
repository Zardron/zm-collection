import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/app/components/ui/card";
import { type LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden group hover:border-[var(--accent)]/30 transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-[var(--foreground)]/50">
              {title}
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                {value}
              </h3>
              {trend && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-sm font-semibold px-2 py-0.5 rounded-full",
                    trend.isPositive 
                      ? "text-emerald-500 bg-emerald-500/10" 
                      : "text-red-500 bg-red-500/10"
                  )}
                >
                  {trend.isPositive ? (
                    <ArrowUp className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-[var(--foreground)]/40">
                {description}
              </p>
            )}
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 group-hover:from-[var(--accent)]/30 group-hover:to-[var(--accent)]/10 transition-all duration-300">
            <Icon className="h-7 w-7 text-[var(--accent)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
