import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  /** Label text rendered above the field. Defaults to the muted forest tone. */
  label: string;
  /** Attach the label to a form control. */
  htmlFor?: string;
  /** Override the default `text-label text-forest/60` label styling. */
  labelClassName?: string;
  /** Optional hint text shown under the children (muted, small). */
  hint?: string;
  /** Optional error message — overrides the hint slot when present. */
  error?: string;
  /** Field content (input, select, picker, …). */
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout primitive that wraps a form control with a label, an optional hint,
 * and an optional error message. Consumers keep full control of the control's
 * own styling — the label is the only piece standardized here.
 */
export function FormField({
  label,
  htmlFor,
  labelClassName,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={htmlFor}
        className={cn("text-label text-forest/60", labelClassName)}
      >
        {label}
      </label>
      {children}
      {(error || hint) && (
        <p data-error={error ? "true" : undefined} className={cn("mt-1 text-body-sm", error ? "text-terracotta" : "text-forest/50")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
