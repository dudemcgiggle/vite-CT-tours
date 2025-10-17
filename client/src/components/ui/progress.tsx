"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type RootProps = Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "children"
>;
type ProgressProps = RootProps & { value?: number };

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const notFull = clamped < 100;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        "progress-gradient relative h-[15px] w-full overflow-hidden rounded-full",
        "bg-gray-200 border border-gray-300",
        notFull ? "has-soft-cap" : "is-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="progress-indicator h-full w-full will-change-[clip-path] rounded-full"
        style={{ clipPath: `inset(0 ${100 - clamped}% 0 0)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };