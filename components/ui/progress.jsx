"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-100",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-in-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs font-medium text-white drop-shadow">
        {Math.round(value || 0)}%
      </span>
    </div>
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }