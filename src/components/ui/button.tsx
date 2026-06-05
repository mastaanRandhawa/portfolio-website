import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonTransition =
  "transition-[background-color,border-color,color,box-shadow,opacity] duration-300 ease-out"

const buttonVariants = cva(
  `group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-sans text-xs font-medium uppercase tracking-[0.18em] whitespace-nowrap outline-none select-none focus-visible:underline focus-visible:underline-offset-4 disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ${buttonTransition}`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-charcoal-muted active:bg-primary",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background active:bg-foreground/90 active:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-stone active:bg-secondary",
        ghost:
          "text-foreground hover:bg-foreground/[0.06] active:bg-foreground/[0.1]",
        destructive:
          "text-destructive hover:bg-destructive/10 active:bg-destructive/15",
        link: "text-foreground underline-offset-[6px] hover:text-foreground/70 normal-case tracking-wide",
      },
      size: {
        default:
          "h-10 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "h-7 gap-1 px-3 text-[0.625rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-4 text-[0.6875rem] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 px-8 text-xs has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
