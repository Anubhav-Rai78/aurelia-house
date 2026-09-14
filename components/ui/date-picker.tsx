"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

// ── Radix Popover Primitives ──────────────────────────────────────────────────
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-[90] w-auto rounded border border-forest/15 bg-ivory p-4 text-forest shadow-xl outline-none transition-all duration-200",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// ── Reusable Calendar Component ──────────────────────────────────────────────
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption_label: "font-serif text-[18px] font-medium text-forest tracking-wide",
        nav: "space-x-1 flex items-center justify-between mb-2",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex mb-1",
        weekday: "text-forest/50 rounded-md w-9 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-center",
        week: "flex w-full mt-1",
        day: cn("h-9 w-9 p-0 font-sans text-[14px] font-normal text-forest aria-selected:opacity-100 hover:bg-sand/50 transition-colors flex items-center justify-center rounded-[2px]"),
        range_start: "bg-forest text-ivory font-medium hover:bg-forest hover:text-ivory",
        range_end: "bg-forest text-ivory font-medium hover:bg-forest hover:text-ivory",
        selected: "bg-forest text-ivory font-medium hover:bg-forest hover:text-ivory focus:bg-forest focus:text-ivory",
        today: "text-terracotta font-semibold underline underline-offset-4",
        outside: "text-forest/30 opacity-40 hover:bg-transparent",
        disabled: "text-forest/20 opacity-30 line-through hover:bg-transparent",
        range_middle: "aria-selected:bg-sand/40 aria-selected:text-forest hover:aria-selected:bg-sand/60",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (chevronProps) => {
          if (chevronProps.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 text-forest" />;
          }
          return <ChevronRight className="h-4 w-4 text-forest" />;
        },
      }}
      {...props}
    />
  );
}

// ── Single DatePicker Component ──────────────────────────────────────────────
export interface DatePickerProps {
  date?: string; // YYYY-MM-DD
  onDateChange: (dateISO: string) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  minDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = date ? parseISO(date) : undefined;

  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    const dateISO = format(newDate, "yyyy-MM-dd");
    onDateChange(dateISO);
    setOpen(false);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-forest/15 bg-transparent py-2.5 text-left font-sans text-body text-forest focus:border-terracotta focus:outline-none transition-colors"
          >
            <span className={cn(!selectedDate && "text-forest/40")}>
              {selectedDate ? format(selectedDate, "MMM dd, yyyy") : placeholder}
            </span>
            <CalendarIcon className="h-4 w-4 text-terracotta opacity-80" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate || undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
// ── Luxury DateRangePicker Component ─────────────────────────────────────────
export interface DateRangePickerProps {
  checkIn?: string;
  checkOut?: string;
  onRangeChange: (checkInISO: string, checkOutISO: string) => void;
  className?: string;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onRangeChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const range: DateRange | undefined = React.useMemo(() => {
    const from = checkIn ? parseISO(checkIn) : undefined;
    const to = checkOut ? parseISO(checkOut) : undefined;
    return {
      from: from && !isNaN(from.getTime()) ? from : undefined,
      to: to && !isNaN(to.getTime()) ? to : undefined,
    };
  }, [checkIn, checkOut]);

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) return;
    const fromStr = newRange.from ? format(newRange.from, "yyyy-MM-dd") : "";
    const toStr = newRange.to ? format(newRange.to, "yyyy-MM-dd") : "";

    onRangeChange(fromStr, toStr);

    if (newRange.from && newRange.to) {
      setOpen(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded border border-forest/10 bg-ivory px-4 py-3 text-left font-sans text-body text-forest focus:outline-none hover:border-forest/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-4 w-4 text-terracotta" />
              <span>
                {range?.from ? format(range.from, "MMM dd") : "Check-in"}
                {" — "}
                {range?.to ? format(range.to, "MMM dd, yyyy") : "Check-out"}
              </span>
            </div>
            <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-forest/50">
              Select Dates
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <Calendar
            mode="range"
            defaultMonth={range?.from || today}
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={{ before: today }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
