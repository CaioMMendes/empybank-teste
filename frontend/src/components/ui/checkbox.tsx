import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "item-center peer flex h-[0.85rem] w-[0.85rem] shrink-0 border border-content-base shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-primary",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current data-[state=checked]:-translate-x-[0.0450rem] data-[state=checked]:-translate-y-[0.05rem]",
      )}
    >
      <CheckIcon className="size-[0.85rem]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
