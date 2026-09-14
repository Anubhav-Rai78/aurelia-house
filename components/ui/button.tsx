import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * AURELIA HOUSE Button — the site's primary button component.
 *
 * Design (per brief): sharp 4px radius, generous padding, uppercase labels,
 * slow 300ms background-color transitions, no scale/bounce/shadow.
 *
 * Renders as a Next.js <Link> when `href` is provided, otherwise as a
 * native <button>. `asChild` plus the additional variants/sizes below are
 * general-purpose additions kept for flexibility (icon-only buttons, ghost
 * actions, destructive confirmations).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Aurelia House: bg-only in CVA, text color applied via inline style
        primary: "bg-forest hover:bg-terracotta",
        secondary: "bg-transparent border border-forest hover:bg-forest/10",
        "primary-inverse": "bg-ivory hover:bg-terracotta",
        "secondary-inverse": "bg-transparent border border-ivory hover:bg-ivory/10",
        // Additional utility variants
        ghost: "text-forest hover:bg-forest/10",
        destructive: "bg-terracotta text-ivory hover:bg-forest",
        link: "text-forest underline underline-offset-4 hover:text-terracotta",
      },
      size: {
        default: "px-8 py-4 text-label",
        sm: "px-4 py-2 text-[13px]",
        lg: "px-8 py-5 text-label",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  /** Aurelia: render as a Next.js Link. */
  href?: string;
  /** Render the child element instead of a <button>. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    // Aurelia: inline text colors using CSS variables (bypasses Tailwind JIT stripping)
    const textColorStyle: React.CSSProperties = (() => {
      switch (variant) {
        case "primary":
          return { "--text-r": "246", "--text-g": "241", "--text-b": "232" } as React.CSSProperties;
        case "secondary":
          return { "--text-r": "23", "--text-g": "53", "--text-b": "47" } as React.CSSProperties;
        case "primary-inverse":
          return { "--text-r": "23", "--text-g": "53", "--text-b": "47" } as React.CSSProperties;
        case "secondary-inverse":
          return { "--text-r": "246", "--text-g": "241", "--text-b": "232" } as React.CSSProperties;
        default:
          return {};
      }
    })();

    const style: React.CSSProperties = {
      color: "rgb(var(--text-r) var(--text-g) var(--text-b) / 1)",
      ...textColorStyle,
    };

    // Aurelia: link button.
    if (href) {
      return (
        <Link href={href} className={classes} style={style}>
          {children}
        </Link>
      );
    }

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} style={style} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} style={style} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
